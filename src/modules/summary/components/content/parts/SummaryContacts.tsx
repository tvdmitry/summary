import React from 'react';
import Map from './../../../../../../public/images/map/map.png';
import Group from './../../../../../../public/images/group/group.svg';

export function SummaryContacts() {
  return (
    <section className="contacts">
      <div className="contacts-map">
        <img className="contacts-map__icon" src={Map} alt="Map" />
        <div className="contacts-map__group group">
          <img className="group__icon" src={Group} alt="Group" />
          <div className="group__description">
            <div className="group__text">Комсомольская площадь, 2</div>
          </div>
        </div>
      </div>
      <div className="contacts-info">
        <div className="info__title">Контакты:</div>
        <div className="info__phone__content">
          <a href="tel: +74959297078">
            <span className="info__phone">+7 495 929-70-78</span>
          </a>
        </div>
        <div className="info__email__content">
          <a href="mailto:welcome@ret-team.su">
            <span className="info__email">welcome@ret-team.su</span>
          </a>
        </div>
        <div className="info__schedule">
          Мы работаем в будни с 9:00 до 18:00.
        </div>
      </div>
    </section>
  );
}

export default SummaryContacts;
