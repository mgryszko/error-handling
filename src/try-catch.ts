import { NameError, TooLongError, TooShortError } from "./Errors";

export const throwHello = (name: string) => {
	if (name.length < 1) {
		throw new TooShortError();
	}

	if (name.length > 10) {
		throw new TooLongError(name);
	}

	if (name === "a name") {
		throw new NameError();
	}

	return `Hello ${name}`;
};
