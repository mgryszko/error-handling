const errorFunction = (name: string) => {
	if (name.length < 1) {
		throw new Error("Input must be greater than 1");
	}

	return `Hello ${name}`;
};

const showName = () => {
	try {
		console.log(errorFunction("try catch"));
	} catch (error: unknown) {
		console.log("Hello Anonymous");
	}
};

showName();
