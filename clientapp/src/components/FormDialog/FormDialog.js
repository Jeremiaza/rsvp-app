import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { setDietaryRestrictions, setAccepted } from '../../reducers/guestReducer';
import { setNotification } from '../../reducers/notificationReducer'
import { setLoading } from '../../reducers/commonReducer'
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import NavigationBar from '../NavigationBar/NavigationBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useDispatch } from 'react-redux'
import { Typography } from '@mui/material';
import guestService from '../../services/guests'
import LocationMap from '../Map/LocationMap';
import texts from '../../locale/texts.json'
import './FormDialog.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

theme.typography.h1 = {
  fontSize: '2.0rem',
  '@media (min-width:600px)': {
    fontSize: '2.0rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};
var views = ["lomake", "info", "pöytä", "sijainti", "muistaminen"]

function FormDialog() {
  const [index, setIndex] = useState(0);
  const guests = useSelector((state) => state.guests)
  const isLoading = useSelector((state) => state.common.loading)
  const [answered] = useState(guests[0].answered);
  const [view, setView] = useState("lomake");
  const dispatch = useDispatch();
  const handleView = (view) => {
    setView(view);
  }

  const handleResponse = async (event) => {
    dispatch(setLoading(true));
    event.preventDefault()
    try {
      guests.forEach(async guest => {
        await guestService.update(guest)
      });
      dispatch(setNotification({ message: texts.send_successful, notificationType: "success" }))
      setView("info");
    } catch (exception) {
      dispatch(setNotification({ message: texts.something_went_wrong, notificationType: "error" }))
    } finally {
      dispatch(setLoading(false));
    }
  }

  const str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  }

  const handleAccepted = (value, index) => {
    dispatch(setAccepted({ accepted: str2bool(value), index: index }))
  }

  const handleDietChange = (name, value, index) => {
    dispatch(setDietaryRestrictions({
      diet: {
        [name]: value
      },
      index: index
    }))
  }
  return (
    <div>
      <Dialog open disableEscapeKeyDown fullWidth maxWidth='lg' PaperProps={{
        sx: {
          minHeight: 580,
          maxHeight: 580
        }
      }}>
        <NavigationBar handleView={handleView} views={views} />
        {view === "lomake" ?
          <div className={'form_dialog'}>
            <DialogTitle className={'form_dialog-title-main'}>
              <ThemeProvider theme={theme}>
                <Typography variant="h1" className={'form_dialog-title'} >{
                  answered ? texts.alter_answer
                    : texts.invite_form}
                </Typography >
                <Typography variant="h1" className={'form_dialog-title form_dialog-name-title'}>{guests[index].name}</Typography>
              </ThemeProvider>
            </DialogTitle>
            {guests.length > 0 || !isLoading ?
              <DialogContent >
                <FormGroup className={'form_dialog-content'}>
                  <RadioGroup
                    className='form_dialog-accepted'
                    value={guests[index].accepted}
                    onChange={(e) => handleAccepted(e.target.value, index)}
                  >
                    <FormControlLabel
                      className='form_dialog-accepted-label'
                      control={<Radio />}
                      value={true}
                      label={texts.accept}
                    />
                    <FormControlLabel
                      className='form_dialog-accepted-label'
                      control={<Radio />}
                      value={false}
                      label={texts.decline}
                    />
                  </RadioGroup>
                  {guests[index].accepted &&
                    <React.Fragment>
                      <FormControl className='form_dialog-maincourse'>
                        <FormLabel className="form_dialog-maincourse-title">{texts.main_course}</FormLabel>
                        <RadioGroup
                          defaultValue={texts.meat}
                          value={guests[index].mainCourse}
                          name="radio-buttons-group"
                          row
                          onChange={(e) => handleDietChange("mainCourse", e.target.value, index)}
                        >
                          <FormControlLabel value="meat" control={<Radio />} label={texts.meat} />
                          <FormControlLabel value="vegetarian" control={<Radio />} label={texts.vegetarian} />
                          <FormControlLabel value="vegan" control={<Radio />} label={texts.vegan} />
                        </RadioGroup>
                      </FormControl>
                      <div className='form_dialog-dietary-restrictions'>
                        <h3 className={'form_dialog-dietary-restrictions-title'}>{texts.dietary_restrictions}</h3>
                        <TextField
                          margin="dense"
                          className={'form_dialog-other'}
                          inputProps={{ maxLength: 32 }}
                          type="text"
                          placeholder="Kirjoita tähän"
                          value={guests[index].diet_Other || ""}
                          onChange={(e) => handleDietChange("diet_Other", e.target.value, index)}
                        />
                      </div>
                    </React.Fragment>
                  }
                </FormGroup>
              </DialogContent>
              : null}
            <DialogActions>
              {guests.length - index === 1 ?
                <LoadingButton className={"form_dialog-submit"} loading={isLoading} variant="contained" onClick={handleResponse} color="success">
                  {texts.send}
                </LoadingButton>
                : null}
              {index === 1 && guests.length > 1 ?
                <Button size='large' className={'form_dialog-prev'} variant="contained" onClick={() => setIndex(index - 1)} color="success">{texts.back}</Button>
                : null}
              {index !== 1 && guests.length > 1 ?
                <Button size='large' className={'form_dialog-next'} variant="contained" onClick={() => setIndex(index + 1)} color="success">{texts.next}</Button>
                : null}
            </DialogActions>
          </div>
          : null}
        {view === "info" ?
          <div className={'form_dialog'}>
            <DialogTitle>
              <div>
                <ThemeProvider theme={theme}>
                  <Typography variant="h1" className={'form_dialog-title'} >{texts.info}</Typography >
                </ThemeProvider>
              </div>
            </DialogTitle>
            <DialogContent style={{ "display": "block" }}>
              <ThemeProvider theme={theme}>
                <Typography variant="h3" className={'info_text'}>{texts.info_text1}</Typography>
                <Typography variant="h3" className={'info_text'}>{texts.info_text2}</Typography>
                <Typography variant="h3" className={'info_text'}>{texts.info_text3}</Typography>
                <Typography variant="h3" className={'info_text'}>{texts.info_text4}</Typography>
                <Typography variant="h3" className={'info_text'}>{texts.info_text5}</Typography>
              </ThemeProvider>
            </DialogContent>
          </div>
          : null}
        {view === "pöytä" ?
          <div className={'form_dialog'}>
            <DialogTitle>
              <ThemeProvider theme={theme}>
                <Typography variant="h1" className={'form_dialog-title'} >{texts.table_arrangement}</Typography >
              </ThemeProvider>
            </DialogTitle>
            <DialogContent style={{ "display": "block" }} className={'form_dialog-table'}>
            <img src="/poyta_jarjestys.jpg" alt="" height={600}/>
            </DialogContent>
          </div>
          : null}
        {view === "sijainti" ?
          <div className={'form_dialog'}>
            <DialogContent>
              <LocationMap />
            </DialogContent>
          </div>
          : null}
        {view === "muistaminen" ?
          <div className={'form_dialog'}>
            <DialogTitle>
              <ThemeProvider theme={theme}>
                <Typography variant="h1" className={'form_dialog-title'} >{texts.remembering}</Typography >
              </ThemeProvider>
            </DialogTitle>
            <DialogContent style={{ "display": "block" }}>
              <ThemeProvider theme={theme}>
                <Typography variant="h3" className={'info_text'}>{texts.remembering_info_text}</Typography>
                <Typography variant="h3" className={'info_text'}>{texts.remembering_info_text2}</Typography>
                <Typography variant="h3" id={'gifting_text-details'}>{texts.remembering_bank}</Typography>
              </ThemeProvider>
            </DialogContent>
          </div>
          : null}
      </Dialog>
    </div>
  );
}

export default FormDialog;
