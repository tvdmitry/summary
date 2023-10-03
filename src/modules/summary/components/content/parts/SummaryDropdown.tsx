import { Dispatch, SetStateAction, useState } from 'react';
import { SelectData } from '../../../types';
import { BiChevronDown } from 'react-icons/bi';

type SummaryDropdownProps = {
  /**
   * Data vacancy
   */
  dataVacancy?: SelectData[];

  /**
   * Selected city
   */
  selectedCity?: string;

  /**
   * Set selected city
   */
  setSelectedCity: Dispatch<SetStateAction<string>>;

  /**
   * Is selected city
   */
  isSelectedCity?: boolean;

  /**
   * Data city
   */
  dataCity?: SelectData[];

  /**
   * Selected vacancy
   */
  selectedVacancy?: string;

  /**
   * Set selected vacancy
   */
  setSelectedVacancy: Dispatch<SetStateAction<string>>;
};

export function SummaryDropdown(props: SummaryDropdownProps) {
  const {
    dataCity,
    selectedCity,
    setSelectedCity,
    isSelectedCity,
    dataVacancy,
    setSelectedVacancy,
    selectedVacancy,
  } = props;

  const [open, setOpen] = useState(false);

  const toggleExpand = () => {
    setOpen((open) => !open);
  };

  const selectCity = (item: SelectData) => {
    if (item?.label?.toLowerCase() !== selectedCity?.toLowerCase()) {
      setSelectedCity(item?.label);
      setOpen(false);
    }
  };

  const selectVacancy = (item: SelectData) => {
    if (item?.label?.toLowerCase() !== selectedVacancy?.toLowerCase()) {
      setSelectedVacancy(item?.label);
      setOpen(false);
    }
  };

  return (
    <div
      className={`dropdown ${
        isSelectedCity ? 'dropdown-city' : 'dropdown-vacancy'
      }`}
    >
      <div
        onClick={toggleExpand}
        className={`button ${
          isSelectedCity ? 'dropdown__button' : 'dropdown__button-normal'
        }`}
      >
        <div
          className={`${
            isSelectedCity
              ? 'dropdown__button_text'
              : 'dropdown__button_text_summary'
          }`}
        >
          {isSelectedCity ? (
            selectedCity ? (
              selectedCity?.length > 25 ? (
                selectedCity?.substring(0, 25) + '...'
              ) : (
                <div className="dropdown__button_text_selected text-danger">
                  {selectedCity}
                </div>
              )
            ) : (
              'Выберите город'
            )
          ) : selectedVacancy ? (
            String(selectedCity).length > 25 ? (
              selectedVacancy?.substring(0, 25) + '...'
            ) : (
              <div className="text-danger">{selectedVacancy}</div>
            )
          ) : (
            'Выберите вакансию'
          )}
        </div>
        <BiChevronDown
          size={20}
          className={`dropdown__icon ${
            open ? 'dropdown__icon_open' : 'dropdown__icon_close'
          }
          ${selectedCity || selectedVacancy ? 'text-danger' : ''}`}
        />
      </div>
      <ul
        className={`dropdown__list ${
          open ? 'dropdown__list_visible' : 'dropdown__list_hidden'
        }
        ${isSelectedCity ? 'dropdown__list_visible_city' : ''}`}
      >
        {isSelectedCity
          ? dataCity?.map((item) => (
              <li
                key={item?.value}
                className={`dropdown__item ${
                  item?.label?.toLowerCase() === selectedCity?.toLowerCase()
                    ? 'dropdown__item_selected'
                    : ''
                }`}
                onClick={() => selectCity(item)}
              >
                {item?.label}
              </li>
            ))
          : dataVacancy?.map((item) => (
              <li
                key={item?.value}
                className={`dropdown__item ${
                  item?.label?.toLowerCase() ===
                    selectedVacancy?.toLowerCase() && 'dropdown__item_selected'
                }`}
                onClick={() => selectVacancy(item)}
              >
                {item?.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default SummaryDropdown;
