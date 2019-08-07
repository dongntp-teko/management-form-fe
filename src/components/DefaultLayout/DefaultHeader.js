// @flow
import React, { useEffect, useState } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from 'assets/img/brand/logoPV.svg';
import { useGlobal } from 'reactn';
import { dateTimeHelper, notificationHelper } from 'helpers';
import moment from 'moment';
import _ from 'lodash';
import { authConstants, localStorageConstants } from 'constant';
import { regions } from 'localization';
import Region from 'components/Region';
import NotificationModal from './NotificationsModal';

const originalSetItem = localStorage.setItem;
const KEY_EVENT_INSERTED = 'itemInserted';
const dropDownStyle = { right: 'auto', width: 400 };

// eslint-disable-next-line func-names

const setItemDescriptor = Object.getOwnPropertyDescriptor(
  localStorage,
  'setItem',
);
if (!setItemDescriptor || setItemDescriptor.writeable) {
  localStorage.setItem = function() {
    const event = new Event(KEY_EVENT_INSERTED);
    // eslint-disable-next-line prefer-rest-params
    originalSetItem.apply(this, arguments);

    document.dispatchEvent(event);
  };
}

const readCurrentNotifications = setNotifications => {
  const notifications = notificationHelper.getNotificationsForCurrentUser();
  setNotifications(notifications);
};

export default (props: Object) => {
  const [currentUser] = useGlobal(authConstants.KEY_CURRENT_USER);
  const [modalVisible, setModalVisible] = useState(false);

  const [notifications, setNotifications] = useGlobal(
    localStorageConstants.NOTIFICATION_KEY,
  );
  const sortedNotifications = _.orderBy(notifications, ['createdAt'], ['desc']);
  const totalUnSeenNotification = sortedNotifications.filter(n => !n.seen)
    .length;
  const seenAllNotifications = () => {
    const seenNotifications = notifications.map(n => ({ ...n, seen: true }));
    notificationHelper.putNotificationsForCurrentUser(seenNotifications);
  };
  const storageHandler = () => {
    readCurrentNotifications(setNotifications);
  };
  useEffect(() => {
    readCurrentNotifications(setNotifications);
    document.addEventListener(KEY_EVENT_INSERTED, storageHandler, false);
    return () => {
      document.removeEventListener(KEY_EVENT_INSERTED, storageHandler);
    };
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const { onLogout, onChangeLanguage, language } = props;
  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{
          src: logo,
          width: 45,
          height: 45,
          alt: 'Seller Center Logo',
        }}
        minimized={{
          src: logo,
          width: 35,
          height: 35,
          alt: 'Seller Center Logo',
        }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3">
          <NavLink href="/">Seller Center</NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <AppHeaderDropdown direction="down">
          <DropdownToggle nav>
            <Region language={language} />
          </DropdownToggle>
          <DropdownMenu>
            {Object.keys(regions).map(el => (
              <DropdownItem key={el} onClick={() => onChangeLanguage(el)}>
                <Region language={el} />
              </DropdownItem>
            ))}
          </DropdownMenu>
        </AppHeaderDropdown>
        <AppHeaderDropdown direction="down">
          <DropdownToggle nav>
            <i className="icon-bell" />
            {totalUnSeenNotification > 0 && (
              <Badge pill color="danger">
                {totalUnSeenNotification}
              </Badge>
            )}
          </DropdownToggle>
          <DropdownMenu right style={dropDownStyle} className="text-wrap">
            <DropdownItem header tag="div" className="d-flex">
              <strong>Thông báo</strong>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <strong
                tabIndex={0}
                data-testid="seen-all"
                className="ml-auto clickable px-1"
                role="button"
                onClick={seenAllNotifications}
              >
                Đánh dấu đã đọc
              </strong>
            </DropdownItem>
            {sortedNotifications
              .slice(0, 5)
              .map(({ title, message, type, createdAt, id, seen }) => {
                return (
                  <DropdownItem key={id} className="link">
                    <div className="d-flex align-items-center">
                      <i className={`fa fa-bell-o text-${type}`} />
                      <b
                        className={
                          seen ? 'text-secondary text-wrap' : 'text-wrap'
                        }
                      >
                        {title}
                      </b>
                      <small className="ml-auto pl-5">
                        {dateTimeHelper.formatTime(moment(createdAt))}
                      </small>
                    </div>
                    <div>
                      <small className="text-wrap">{message}</small>
                    </div>
                  </DropdownItem>
                );
              })}
            <DropdownItem
              className="text-center clickable"
              data-testid="view-all"
              onClick={toggleModal}
            >
              <b>View All</b>
            </DropdownItem>
          </DropdownMenu>
        </AppHeaderDropdown>
        <AppHeaderDropdown direction="down">
          <DropdownToggle nav>
            <span>{`Hi, ${currentUser && currentUser.name}`}</span>
            <img
              src={
                (currentUser && currentUser.avatarUrl) ||
                'https://s3.amazonaws.com/uifaces/faces/twitter/alexivanichkin/128.jpg'
              }
              className="img-avatar"
              alt="User"
            />
          </DropdownToggle>
          <DropdownMenu right style={{ right: 'auto' }}>
            <DropdownItem id="log-out-btn" onClick={e => onLogout(e)}>
              <i className="fa fa-lock" /> Đăng xuất
            </DropdownItem>
          </DropdownMenu>
        </AppHeaderDropdown>
      </Nav>
      {modalVisible && (
        <NotificationModal
          visible={modalVisible}
          onCancel={closeModal}
          notifications={sortedNotifications}
        />
      )}
    </React.Fragment>
  );
};
