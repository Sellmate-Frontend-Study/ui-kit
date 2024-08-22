import { FaCheck } from "react-icons/fa";
import { Button } from "../components/Button";
import { ButtonGroup } from "../components/ButtonGroup";

export const Btn = () => {
  return (
    <div className="p-5 space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Size</h3>
        <div className="space-x-3">
          <Button size="xs" label="xs button" />
          <Button size="sm" label="sm button" />
          <Button size="md" label="md button" />
          <Button size="lg" label="lg button" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Color</h3>
        <div className="space-x-3">
          <Button color="red" label="Red" />
          <Button color="blue" label="Blue" />
          <Button color="green" label="Green" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Disabled</h3>
        <div className="space-x-3">
          <Button disabled={true} label="Disabled" />
          <Button disabled={false} label="Enabled" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Outline</h3>
        <div className="space-x-3">
          <Button color="red" outline={true} label="Red" />
          <Button color="blue" outline={true} label="Blue" />
          <Button color="green" outline={true} label="Green" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Icon</h3>
        <div className="space-x-3">
          <Button color="red" icon={<FaCheck />} />
          <Button color="blue" icon={<FaCheck />} />
          <Button color="green" icon={<FaCheck />} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Button Group</h3>
        <ButtonGroup
          size="xs"
          buttons={[
            { color: "blue", label: "Disabled", disabled: true },
            { color: "blue", label: "Enabled" },
            { color: "blue", label: "Outline", outline: true },
          ]}
        />
        <ButtonGroup
          size="sm"
          buttons={[
            { color: "blue", label: "Disabled", disabled: true },
            { color: "blue", label: "Enabled" },
            { color: "blue", label: "Outline", outline: true },
          ]}
        />
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Toggle Button Group</h3>
        <ButtonGroup
          toggleMode={true}
          buttons={[
            { color: "blue", label: "toggle" },
            { color: "blue", label: "toggle" },
            { color: "blue", label: "toggle" },
          ]}
        />
      </div>
    </div>
  );
};