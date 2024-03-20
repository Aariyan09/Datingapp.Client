import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventSavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component, currentRoute, currentState, nextState) => {
  if(component.editForm?.dirty || component.editForm?.touched){
    return confirm('Are you sure you want to cancel all the unsaved changes?')
  }
  return true;
};
