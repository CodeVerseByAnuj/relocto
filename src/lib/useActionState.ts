import * as React from "react";
import { useFormState } from "react-dom";

/**
 * Next's App Router runs on React 19, where `useFormState` was renamed to
 * `React.useActionState`, while this project still installs React 18 (and its
 * types), which only has `useFormState`. Use the new hook when the runtime has
 * it. Once react/react-dom are upgraded to 19, import `useActionState` from
 * "react" directly and delete this file.
 */
export const useActionState: typeof useFormState =
  (React as unknown as { useActionState?: typeof useFormState })
    .useActionState ?? useFormState;
