import { BaseSyntheticEvent, useState } from 'react';
import SummaryDropdown from './SummaryDropdown';
import Attach from './../../../../../../public/images/attach/attach.svg';
import Trash from './../../../../../../public/images/trash/trash.svg';
import { cityOptions } from '../../../data/cityOptions';
import { vacancyOptions } from '../../../data/vacancyOptions';

export function SummaryForm() {
  const [selectedCity, setSelectedCity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedVacancy, setSelectedVacancy] = useState('');
  const [info, setInfo] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const changeName = (e: BaseSyntheticEvent) => {
    setName(e.target.value);
  };

  const changeEmail = (e: BaseSyntheticEvent) => {
    setEmail(e.target.value);
  };

  const changeInfo = (e: BaseSyntheticEvent) => {
    setInfo(e.target.value);
  };

  const handleFileChange = (e: BaseSyntheticEvent) => {
    const files = e.target.files;
    setAttachedFiles(Array.from(files));
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = [...attachedFiles];
    updatedFiles.splice(index, 1);
    setAttachedFiles(updatedFiles);
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (
      isChecked &&
      selectedCity &&
      selectedVacancy &&
      name &&
      email &&
      info &&
      Array.isArray(attachedFiles) &&
      attachedFiles.length > 0
    ) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('selectedCity', selectedCity);
      formData.append('selectedVacancy', selectedVacancy);
      formData.append('info', info);
      attachedFiles.forEach((file, index) => {
        formData.append(`attachedFile${index}`, file);
      });

      const jsonData: Record<string, any> = {};

      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      alert(`Ваши данные успешно отправлены, ${JSON.stringify(jsonData)}`);
    } else {
      alert(
        'Пожалуйста, согласитесь с политикой конфиденциальности или заполните все поля.'
      );
    }

    /* TODO
    fetch('/server-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Обработка ответа от сервера
      })
      .catch((error) => {
        // Обработка ошибок
      });
    */
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="form__title text-bold">Отправьте ваше резюме</h1>
        <div className="form-description">
          <div className="form-description__item summary-description">
            <div className="form-description__item-build">
              <div className="form-description__text">
                Постройте своё будущее c РусЭлитТрейдинг в городе
              </div>
              <div className="form-description__dropdown">
                <SummaryDropdown
                  dataCity={cityOptions}
                  isSelectedCity={true}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedVacancy={selectedVacancy}
                  setSelectedVacancy={setSelectedVacancy}
                />
              </div>
            </div>
          </div>
          <div className="form-description__item">
            <div className="form-description__input">
              <input
                id="name"
                type="text"
                placeholder="Как вас зовут?"
                value={name}
                className="input__summary"
                onChange={changeName}
              />
            </div>
          </div>
          <div className="form-description__item">
            <div className="input__email">
              <div className="input__email-label">
                <label htmlFor="email">Ваш E-mail</label>
              </div>
              <div className="form-description__input">
                <input
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  className="input__summary"
                  onChange={changeEmail}
                />
              </div>
            </div>
          </div>
          <div className="form-description__item">
            <div className="form-description__dropdown">
              <SummaryDropdown
                dataVacancy={vacancyOptions}
                isSelectedCity={false}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedVacancy={selectedVacancy}
                setSelectedVacancy={setSelectedVacancy}
              />
            </div>
            <div className="form-description__item-line form-description__item-line_vacancy"></div>
          </div>
          <div className="form-description__item">
            <div className="form-description__input form-description__input-info">
              <input
                id="name"
                type="text"
                placeholder="Напишите о себе кратко"
                value={info}
                className="input__summary text-lg"
                onChange={changeInfo}
              />
            </div>
            <div className="form-description__item-line form-description__item-line_info"></div>
          </div>
          <div className="form-description__item attach">
            <label htmlFor="attachedFile" className="attach-document">
              <div className="attach-document_icon">
                <img src={Attach} alt="Attach" />
              </div>
              <div className="attach-document_text text-bold">
                Прикрепить документы
              </div>
            </label>
            <input
              type="file"
              id="attachedFile"
              accept=".pdf, .doc, .docx"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple
            />
            {attachedFiles.map((file: File, index) => (
              <div key={index} className="attach-document-change_item">
                <div className="attach-document-change_name">
                  {file?.name ?? ''}
                </div>
                <button
                  type="button"
                  className="attach-document-change_icon"
                  onClick={() => handleFileRemove(index)}
                >
                  <img src={Trash} alt="Trash" />
                </button>
              </div>
            ))}
          </div>
          <div className="form-description__item privacy-policy">
            <label className="privacy-policy__label">
              <input
                type="checkbox"
                className="privacy-policy__icon"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <div className="privacy-policy__text">
                Я соглашаюсь с
                <span className="privacy-policy__description text-danger">
                  политикой конфиденциальности
                </span>
                , нажимая на кнопку “Откликнуться”
              </div>
            </label>
          </div>
        </div>
        <button type="submit" className="reply">
          <span className="reply-button__text">Откликнуться</span>
        </button>
      </form>
    </section>
  );
}

export default SummaryForm;
