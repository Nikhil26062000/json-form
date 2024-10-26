import React, { useState } from "react";
import formSchema from "./form.json";

const FormGenerator = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name, value) => {
    const newValues = formData[name] || [];
    if (newValues.includes(value)) {
      setFormData({
        ...formData,
        [name]: newValues.filter((v) => v !== value),
      });
    } else {
      setFormData({ ...formData, [name]: [...newValues, value] });
    }
  };

  const isVisible = (visibility) => {
    if (!visibility) return true; // No visibility condition, so show by default
    const { field, value } = visibility;
    return formData[field] === value;
  };

  return (
    <form>
      {formSchema.map((section, secIndex) => (
        <div key={secIndex}>
          <h3>{section.sectionTitle}</h3>
          {section.fields.map((field, fieldIndex) => {
            if (!isVisible(field.visibility)) return null;

            return (
              <div key={fieldIndex}>
                <label>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                  >
                    <option value="">Select...</option>
                    {field.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  field.options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <label>
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={
                            formData[field.name]?.includes(option.value) ||
                            false
                          }
                          onChange={() =>
                            handleCheckboxChange(field.name, option.value)
                          }
                        />
                        {option.label}
                      </label>
                    </div>
                  ))
                ) : field.type === "radio" ? (
                  field.options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <label>
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={formData[field.name] === option.value}
                          onChange={() =>
                            handleInputChange(field.name, option.value)
                          }
                        />
                        {option.label}
                      </label>
                    </div>
                  ))
                ) : field.type === "date" ? (
                  <input
                    type="date"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder || ""}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </form>
  );
};

export default FormGenerator;
