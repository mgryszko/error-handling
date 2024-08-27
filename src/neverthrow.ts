import { err, ok, type Result } from "neverthrow";
import { match } from "ts-pattern";

type FunctionError = { type: "TooShort" } | { type: "TooLong" };

const errorFunction = (name: string): Result<string, FunctionError> => {
	if (name.length < 1) {
		return err({ type: "TooShort" });
	}

	if (name.length > 10) {
		return err({ type: "TooLong" });
	}

	return ok(`Hello ${name}`);
};

const showName = () => {
	errorFunction("neverthrow").match(
		(ok) => `${ok}!`,
		(error) =>
			match(error)
				.with({ type: "TooShort" }, () => "Hello Anonymous")
				.with({ type: "TooLong" }, () => {
					throw new Error("Name is too long"); // Not recoverable
				})
				.exhaustive(),
	);
};

showName();
