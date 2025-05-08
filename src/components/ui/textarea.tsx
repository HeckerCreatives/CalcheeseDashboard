import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border border-none px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none  focus-visible:ring-orange-400 focus-visible:ring-[1px] text-xs disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
