import SummaryForm from './parts/SummaryForm';
import SummaryContacts from './parts/SummaryContacts';

export function SummaryContent() {
  return (
    <div className="summary__content">
      <div className="summary__column">
        <SummaryForm />
      </div>
      <div className="summary__column">
        <SummaryContacts />
      </div>
    </div>
  );
}

export default SummaryContent;
