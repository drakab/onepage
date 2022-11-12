let valid = true
const checkbox = document.getElementById('agreement')
const checkboxError = document.getElementById("checkbox-error")
const validateForm = formSelector => {
    const formElement = document.querySelector(formSelector)

    const validationOptions = [
        {
            attribute: 'pattern',
            isValid: input => {
                const patternRegex = new RegExp(input.pattern)
                return patternRegex.test(input.value)
            },
            errorMessage: (input, label) => `Niepoprawny adres ${label.innerText}`
        },
        {
            attribute: 'required',
            isValid: input => input.value.trim() !== '',
            errorMessage: (input, label) => `Pole ${label.innerText} jest wymagane`
        }
    ]

    const validateSingleFormGroup = formGroup => {
        const label = formGroup.querySelector('label')
        const input = formGroup.querySelector('input, textarea')
        const errorContainer = formGroup.querySelector('.error')

        let formGroupError = false
        for(const option of validationOptions) {
            if(input.hasAttribute(option.attribute) && !option.isValid(input)) {
                errorContainer.innerText = option.errorMessage(input, label)
                input.classList.add('invalid')
                formGroupError = true
                valid = false
            }
        }
        if (!formGroupError){
            errorContainer.innerText = ''
            input.classList.remove('invalid')
        }
    }

    formElement.setAttribute('novalidate', '')

    formElement.addEventListener('submit', event => {
        event.preventDefault()
        if (!checkbox.checked){
            checkboxError.innerText = 'Wymagana akceptacja regulaminu'
            checkbox.parentElement.classList.add('invalid')
            validateAllFormGroups(formElement)
        } else {
            valid = true
            checkboxError.innerText = ''
            checkbox.parentElement.classList.remove('invalid')
            validateAllFormGroups(formElement)
            if(valid) event.currentTarget.submit()
            // zrobić tablice/obiekt i sprawdzić czy w każdym przypadku jest true/false
        }
    })

    const validateAllFormGroups = formToValidate => {
        const formGroups = Array.from(formToValidate.querySelectorAll('.formGroup'))
    
        formGroups.forEach(formGroup => {
            validateSingleFormGroup(formGroup)
        })
    }
}

validateForm('#form');