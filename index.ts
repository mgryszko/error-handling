import { match, P } from "ts-pattern";
import { monetHello } from "./src/monet";
import { neverthrowHello } from "./src/neverthrow";
import {
	NameError,
	TooLongError,
	TooShortError,
	type InputError,
} from "./src/Errors";
import { throwHello } from "./src/try-catch";

process.stdout.write("Type a name (try 'a name' to throw): ");

// ChatGPT explains:
// By centralizing error handling in the defaultErrorHandler, the code gains several benefits:
// Centralized Error Management: All error cases are handled in a single place, making the code easier to maintain and understand.
// Exhaustive Handling: The .exhaustive() method ensures that all possible error cases are considered, preventing any unhandled errors.
// Contextual Error Reporting: The NameError case demonstrates how critical errors can be escalated with preserved context, enabling more robust debugging.
// Flexibility: Different behaviors (logging, truncating input, etc.) can be applied based on the specific error type, allowing for tailored responses to different error scenarios.
// This approach not only simplifies error handling but also makes the code more resilient and easier to extend or modify in the future.
//
// These libraries encourage a more organized approach by centralizing error handling in a single function (defaultErrorHandler).
// This makes the code easier to maintain and extend, as all error-related logic is in one place.
// It also makes it clear how each type of error is being handled without needing to trace through multiple try-catch blocks scattered throughout the code.

const defaultErrorHandler = (error: InputError) => {
	return match(error)
		.with(P.instanceOf(TooShortError), (error) => {
			console.error(error);
			return "Hello Anonymous";
		})
		.with(P.instanceOf(TooLongError), (error) => {
			console.warn(error);

			const input = error.input;
			const truncatedInput = input.slice(0, 10);

			return truncatedInput;
		})
		.with(P.instanceOf(NameError), (error) => {
			throw new Error("Unrecoverable error", { cause: error }); // PANIC! Pass `cause` to persist error context
		})
		.exhaustive();
};

for await (const line of console) {
	// MonetJS
	const monetString = monetHello(line).fold(
		defaultErrorHandler,
		(ok) => `${ok}!`,
	);

	// Neverthrow
	const neverThrowString = neverthrowHello(line).match(
		(ok) => `${ok}!`,
		defaultErrorHandler,
	);

	// Try-catch 🫠
	let throwString = "";

	try {
		throwString = `${throwHello(line)}!`;
	} catch (e: unknown) {
		// A lot of checking to see if the error is an instance of a specific error type
		// too much work, let's just use an empty string :)
		throwString = "";
	}

	console.log(`from monet: ${monetString}`);
	console.log(`from neverthrow: ${neverThrowString}`);
	console.log(`from try-catch: ${throwString}`);

	process.stdout.write("Type a name (try 'a name' to throw): ");
}
