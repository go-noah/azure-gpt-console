import { OpenAIChatMessage, OpenAIConfig } from "./OpenAI.types";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export const defaultConfig = {
  model: "gpt-3.5-turbo",
  temperature: 0.5,
  max_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0.6,
 };

export type OpenAIRequest = {
  messages: OpenAIChatMessage[];
} & OpenAIConfig;

export const getOpenAICompletion = async (
  token: string,
  payload: OpenAIRequest,
) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const apiKey = process.env.REACT_APP_AZURE_API_KEY;
  const apiuri = process.env.REACT_APP_AZURE_URI;
  const response = await fetch(apiuri, {
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Check for errors
  if (!response.ok) {
    throw new Error(await response.text());
  }

  let counter = 0;
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
            if (json.choices[0].finish_reason != null) {
              controller.close();
            }
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of response.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
