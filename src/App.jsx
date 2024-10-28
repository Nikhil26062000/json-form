import React, { useState } from "react";
import form_schema from "./form.json";

const DynamicFormComponent = ({ schema }) => {
  const [formData, setFormData] = useState({});

  // Define event handlers in a single object
  const eventHandlers = {
    onKeyUp: {
      handleProjectNameKeyUp: (e) => {
        console.log("Key up event triggered in project name input");
      },
    },
    onBlur: {
      handleProjectNameBlur: (e) => {
        console.log("Blur event triggered in project name input");
      },
    },
    onFocus: {
      handleProjectNameFocus: (e) => {
        console.log("Focus event triggered in project name input");
      },
    },
  };

  // Handle input change
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Dynamically attach event handlers based on schema
  const applyEvents = (field) => {
    const events = {};
    if (field.events) {
      Object.entries(field.events).forEach(([eventName, handlerName]) => {
        if (eventHandlers[eventName] && eventHandlers[eventName][handlerName]) {
          events[eventName] = (e) => eventHandlers[eventName][handlerName](e);
        }
      });
    }
    return events;
  };

  return (
    <form>
      {form_schema?.map((section, index) => (
        <div key={index}>
          <h2>{section.sectionTitle}</h2>
          {section.fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label>{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                field.options.map((option) => (
                  <label key={option.value}>
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option.value}
                      checked={(formData[field.name] || []).includes(
                        option.value
                      )}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(formData[field.name] || []), option.value]
                          : formData[field.name].filter(
                              (val) => val !== option.value
                            );
                        handleInputChange(field.name, newValue);
                      }}
                    />
                    {option.label}
                  </label>
                ))
              ) : field.type === "radio" ? (
                field.options.map((option) => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      name={field.name}
                      value={option.value}
                      checked={formData[field.name] === option.value}
                      onChange={(e) =>
                        handleInputChange(field.name, option.value)
                      }
                      required={field.required}
                    />
                    {option.label}
                  </label>
                ))
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  required={field.required}
                  {...applyEvents(field)} // Dynamically attaching events
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </form>
  );
};

export default DynamicFormComponent;
