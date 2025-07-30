const submitButton = document.querySelector(".form-container-footer button");
const form = document.querySelector(".form");
const requiredInputs = document.querySelectorAll(
  ".form-container-body-item input[required]"
);
const requiredTextarea = document.querySelectorAll(
  ".form-container-body-item textarea[required]"
);
const radioForms = document.querySelectorAll(
  ".form-container-body-item--radio"
);

[...requiredInputs, ...requiredTextarea].forEach((input) => {
  input.addEventListener("blur", validateRequiredInputs);
  input.addEventListener("touchend", validateRequiredInputs);
});

radioForms.forEach((radio) => {
  const label = radio.querySelector("label");
  const input = radio.querySelector("input");
  label.addEventListener("keydown", onRadioLabelClick);
  label.addEventListener("click", onRadioLabelClick);
  if (input.attributes["required"]){
    label.addEventListener("blur", onRadioLabelBlur);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Form submitted");
});

function validateRequiredInputs(event) {
  if (!event.target.value) event.target.setAttribute("aria-invalid", "true");
  else event.target.setAttribute("aria-invalid", "false");
}

function onRadioLabelClick(event) {
  if (event.key === "Enter" || event.type === "click") {
    document.querySelector(`#${event.target.attributes["for"].value}`).click();
  }
}

function onRadioLabelBlur(event) {
  const relatedInput = document.querySelector(
    `#${event.target.attributes["for"].value}`
  );

  const inputsWithSameNameChecked = document.querySelectorAll(
    `input[name="${relatedInput.attributes["name"].value}"]:checked`
  );
  const inputsWithSameName = document.querySelectorAll(
    `input[name="${relatedInput.attributes["name"].value}"]`
  );
  if (inputsWithSameNameChecked.length === 0) {
    inputsWithSameName.forEach((input) => {
      input.setAttribute("aria-invalid", "true");
    });
  }else{
    inputsWithSameName.forEach((input) => {
      input.setAttribute("aria-invalid", "false");
    });
  }
}
