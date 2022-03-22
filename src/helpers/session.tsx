import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
  } from 'react';
  import moment from 'moment';
import { useAuth } from 'contexts/AuthContextProvider';
import { Button, Card, CardBody, CardHeader, Modal } from 'reactstrap';

  
  const SessionTimeout = () => {
    const [events, setEvents] = useState(['click', 'load', 'scroll']);
    const [second, setSecond] = useState(0);
    const [isOpen, setOpen] = useState(false);
    const {
      accessToken,
      logout,
    } = useAuth();
  
    let timeStamp:any;
    let warningInactiveInterval = useRef<any>();
    let startTimerInterval = useRef<any>();
  
    // start inactive check
    let timeChecker = () => {
        console.log('timeString csca');
      startTimerInterval.current = setTimeout(() => {
        let storedTimeStamp = localStorage.getItem('lastTimeStamp');
        warningInactive(storedTimeStamp);
      }, 60000 * 10);
    };
  
    // warning timer
    let warningInactive = (timeString:any) => {
      clearTimeout(startTimerInterval.current);
  
      warningInactiveInterval.current = setInterval(() => {
        const maxTime = 2;
        const popTime = 1;
  
        const diff = moment.duration(moment().diff(moment(timeString)));
        const minPast = diff.minutes();
        const leftSecond = 60 - diff.seconds();
        if (minPast === popTime) {
          setSecond(leftSecond);
          setOpen(true);
        }
  
        if (minPast === maxTime) {
          clearInterval(warningInactiveInterval.current);
          setOpen(false);
          localStorage.removeItem('lastTimeStamp');
          logout();
        }
      }, 1000);
    };
  
    // reset interval timer
    let resetTimer = useCallback(() => {
      clearTimeout(startTimerInterval.current);
      clearInterval(warningInactiveInterval.current);
        console.log('lastTimeStamp', accessToken);
        
      if (localStorage.getItem('bt.token')) {
        timeStamp = moment();
        localStorage.setItem('lastTimeStamp', timeStamp);
      } else {
        clearInterval(warningInactiveInterval.current);
        localStorage.removeItem('lastTimeStamp');
      }
      timeChecker();
      setOpen(false);
    }, [accessToken]);
  
    // handle close popup
    const handleClose = () => {
      setOpen(false);
  
      resetTimer();
    };
  
    useEffect(() => {
      events.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });
  
      timeChecker();
  
      return () => {
        clearTimeout(startTimerInterval.current);
        //   resetTimer();
      };
    }, [resetTimer, events, timeChecker]);
  
    if (!isOpen) {
      return null;
    }
  
    // change fragment to modal and handleclose func to close
    return (
        <div>
        <Modal className="modal-dialog-centered" isOpen={isOpen}>
            <div className="modal-header">
            <strong>Session Expire Warning</strong>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => resetTimer()}>
                <span aria-hidden={true}>×</span>
            </button>
            </div>
            <div className="modal-body">
            <p>your session will expire in.</p>
            <p>Do you want to extend the session?</p>
            </div>
            <div className="modal-footer">
            <Button color="primary" type="button" onClick={() => logout()}>Logout</Button>
            <Button color="secondary" data-dismiss="modal" type="button" onClick={()=> {resetTimer() }}>Extend Session</Button>
            </div>
        </Modal>
        </div>
         )
  };
  
  export default SessionTimeout;