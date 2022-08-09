import handler from "../../libs/handler-lib";

export const main = handler(async (event, context) => {
  // Confirm and verify the user
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;

  return event;
});
