import { twd, userEvent, screenDom } from "twd-js";
import { describe, it, beforeEach } from "twd-js/runner";
import { queryClient } from "#/query-client";

describe("Hello World Page", () => {
  beforeEach(() => {
    twd.clearRequestMockRules();
    queryClient.clear();
  });

  it("should display the welcome title and counter button", async () => {
    await twd.visit("/");

    const title = await screenDom.findByText("Welcome to TWD");
    twd.should(title, 'be.visible');

    const counterButton = await screenDom.findByText("Count is 0");
    twd.should(counterButton, 'be.visible');

    await userEvent.click(counterButton);
    twd.should(counterButton, 'have.text', 'Count is 1');

    await userEvent.click(counterButton);
    twd.should(counterButton, 'have.text', 'Count is 2');

    await userEvent.click(counterButton);
    twd.should(counterButton, 'have.text', 'Count is 3');
  });
});
