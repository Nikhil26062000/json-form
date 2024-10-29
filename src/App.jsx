import { formConfig } from "./forms";

const DynamicForm = ({ config }) => {
  const getInputProps = (field) => {
    const props = {
      id: field.name, // Use name for id
      type: field.type,
      placeholder: field.placeholder,
      className: "mt-1 p-2 border border-gray-300 rounded-md",
      required: field.required,
      onChange: () => {
        console.log(`${field.label} input changed`);
      }, // Handling change dynamically
    };

    // Dynamically add event handlers based on the events configuration
    if (field.events) {
      Object.keys(field.events).forEach((eventKey) => {
        props[eventKey] = field.events[eventKey];
      });
    }

    return props;
  };

  return (
    <form>
      {config.fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <input {...getInputProps(field)} />
        </div>
      ))}
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

const App = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">Dynamic Form</h1>
      <DynamicForm config={formConfig} />
    </div>
  );
};

export default App;
