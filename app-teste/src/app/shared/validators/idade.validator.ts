import { AbstractControl } from '@angular/forms'
import * as moment from 'moment'

export function idadeValidator(control: AbstractControl) {
    const dob = control.value
    const today = moment().startOf('day')
    const delta = today.diff(dob, 'years', false)

    if (delta < 18)
        return { idade: true }
    return null
}