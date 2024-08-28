import {err, errAsync, ok, okAsync, type Result, ResultAsync} from "neverthrow";
import {
	NameError,
	TooLongError,
	TooShortError,
	type InputError,
} from "./Errors";

// Passing return type is technically optional, but it will result in a more readable type.
export const neverthrowHello = (name: string): Result<string, InputError> => {
	if (name.length < 1) {
		return err(new TooShortError());
	}

	if (name.length > 10) {
		return err(new TooLongError(name));
	}

	if (name === "a name") {
		return err(new NameError());
	}

	return ok(`Hello ${name}`);
};

export const neverthrowHelloAsync = (name: string): ResultAsync<string, InputError> => {
	return neverthrowHello(name).match(okAsync, errAsync);
}
