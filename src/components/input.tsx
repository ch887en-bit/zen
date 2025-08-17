import { Button, Input } from "antd";

export default function CustomeInput({ 
  inputValue,
  setInputValue,
  handleQuest
 }: {
  inputValue: string,
  setInputValue: (value: string) => void,
  handleQuest: () => void
 }) {
  
  return (<div className="input-section">
    <Input
      placeholder="What is on my mind today?"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="quest-input"
    />
    <Button
      type="primary"
      className="quest-button"
      onClick={handleQuest}
      size="large"
    >
      Quest
    </Button>
  </div>)
}