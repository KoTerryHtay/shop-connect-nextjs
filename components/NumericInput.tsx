import { Input } from "@/components/ui/input";

type NumericInputProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function NumericInput({
  value = "",
  onChange,
  placeholder,
}: NumericInputProps) {
  return (
    <Input
      type="text"
      inputMode="numeric"
      value={value}
      placeholder={placeholder}
      onWheel={(e) => e.currentTarget.blur()}
      onChange={(e) => {
        const raw = e.target.value;

        const sanitized = raw.replace(/[^\d]/g, "");

        onChange(sanitized);
      }}
    />
  );
}
