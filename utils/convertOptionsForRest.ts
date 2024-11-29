type OptionValue = {
  name: string;
  optionName: string;
};

export default function convertOptionsForRest(optionValues: OptionValue[]): {
  [key: string]: string;
} {
  const result: { [key: string]: string } = {};

  optionValues.forEach((option, index) => {
    result[`option${index + 1}`] = option.name;
  });

  return result;
}
