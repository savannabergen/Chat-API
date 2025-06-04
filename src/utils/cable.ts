import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("wss://chat.savannagrace.dev/cable");

export default cable;