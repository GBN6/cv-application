import React, { useState } from 'react';
import CvForm from './CvForm/CvForm';
import CvResult from './CvResult';
import styled from 'styled-components';
import exampleCV from './Utility/exampleCv';

const Main = () => {
  const [cv, setCv] = useState(exampleCV);

  const handleChangePersonal = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      handleChangePhoto(e);
      return;
    }

    setCv((prevState) => ({
      ...prevState,
      personalInfo: {
        ...prevState.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleChangePhoto = (e) => {
    const { name } = e.target;
    const photo = e.target.files[0];
    if (!photo) return;

    const reader = new FileReader();

    reader.onload = () => {
      setCv((prevState) => ({
        ...prevState,
        personalInfo: {
          ...prevState.personalInfo,
          [name]: reader.result,
        },
      }));
    };
    reader.readAsDataURL(photo);
  };

  const handleChangeExperience = (e) => {
    const { name, value } = e.target;
    setCv((prevState) => ({
      ...prevState,
      experience: {
        ...prevState.experience,
        [name]: value,
      },
    }));
  };

  const handleChangeEducation = (e) => {
    const { name, value } = e.target;
    setCv((prevState) => ({
      ...prevState,
      education: {
        ...prevState.education,
        [name]: value,
      },
    }));
  };

  return (
    <MainWrapper>
      <CvForm
        onChangePersonal={handleChangePersonal}
        onChangeExperience={handleChangeExperience}
        onChangeEducation={handleChangeEducation}
      />
      <CvResult cv={cv} />
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 5rem;
  margin-bottom: 4rem;
  gap: 6rem;

  @media (max-width: 1600px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export default Main;
