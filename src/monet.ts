import { Either } from "monet";
import {
	NameError,
	TooLongError,
	TooShortError,
	type InputError,
} from "./Errors";

// Passing return type is technically optional, but it will result in a more readable type.
export const monetHello = (name: string): Either<InputError, string> => {
	if (name.length < 1) {
		return Either.left(new TooShortError());
	}

	if (name.length > 10) {
		return Either.left(new TooLongError(name));
	}

	if (name === "a name") {
		return Either.left(new NameError());
	}

	return Either.right(`Hello ${name}`);
};
