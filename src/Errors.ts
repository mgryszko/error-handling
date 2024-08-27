export class TooShortError extends Error {
	type = "TooShortError" as const;
	constructor(public input?: string) {
		super("Input is too short");
		this.name = this.type;
	}
}

export class TooLongError extends Error {
	type = "TooLongError" as const;
	constructor(public input: string) {
		super("Input is too long");
		this.name = this.type;
	}
}

export class NameError extends Error {
	type = "NameError" as const;
	constructor() {
		super("Typed 'a name', must be a clown!");
		this.name = this.type;
	}
}

export type InputError = TooLongError | TooShortError | NameError;
