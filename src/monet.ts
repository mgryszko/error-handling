import { Either } from "monet";
import { match } from "ts-pattern";

type FunctionError = { type: "TooShort" } | { type: "TooLong" };

const errorFunction = (name: string): Either<FunctionError, string> => {
	if (name.length < 1) {
		return Either.left({ type: "TooShort" });
	}

	if (name.length > 10) {
		return Either.left({ type: "TooLong" });
	}

	return Either.right(`Hello ${name}`);
};

const showName = () => {
	errorFunction("neverthrow").fold(
		(error) =>
			match(error)
				.with({ type: "TooShort" }, () => "Hello Anonymous")
				.with({ type: "TooLong" }, () => {
					throw new Error("Name is too long"); // Not recoverable
				})
				.exhaustive(),
		(ok) => `${ok}!`,
	);
};

showName();
