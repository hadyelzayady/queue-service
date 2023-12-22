import { ISqsQueueResource } from "@src/controllers/types/Sqs/Sqs";
import { ISqsQueue } from "@src/models/SqsQueue";

function toResource(message: ISqsQueue): ISqsQueueResource {
	return {
		id: message._id ?? "",
		name: message.name,
	};
}

export default {
	toResource,
} as const;
