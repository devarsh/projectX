#Features

1. Form with initital Values
2. Client-Side Validation field wise (inline and async - with loading support)
3. Sever-Side Validation field wise
4. Server sent errors
5. Dependent Fields
6. FormArray with template support
7. FromFeedBack handler
8. Submit and Reset and clear form Handler
9. Cache onChange and OnBlur handler for performance of Array fields
10. Scoping of form fields, single recoil root for multiple forms.

#Pending Features / Issues

1. Auto Save Form
2. Refactor async validation API (move logic from react-query to recoil, to reduce dependency on another library)
3. Add Undo redo capability on form
4. When Array Field deleted unregister field when unmount on unregister is false.
5. When Form is clear remove all the rows from the arrayFields, currently only values cleared and not rows deleted
6. Refactor timeTravel component with slider
