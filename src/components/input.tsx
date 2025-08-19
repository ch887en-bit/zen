import { Button, Form, Input } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import './input.css'
import { useTranslation } from "react-i18next";
export default function CustomeInput({ 
  inputValue,
  setInputValue,
  handleQuest
 }: {
  inputValue: string,
  setInputValue: (value: string) => void,
  handleQuest: () => void
 }) {
  const { t } = useTranslation();
  
  return (<div className="input-section">
    <Form>
      <Input
        placeholder={t('interaction.placeholder')}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="quest-input"
      />
      <Button
        type="primary"
        className="quest-button"
        onClick={handleQuest}
        size="large"
        htmlType="submit"
      >
        <ArrowUpOutlined />
        <span>{t('actions.quest')}</span>
      </Button>
    </Form>
  </div>)
}