import React, { useState, useRef } from 'react';
import CvForm from './CvForm/CvForm';
import CvPreview from './CvPreview';
import styled from 'styled-components';
import exampleCV from './Utility/exampleCv';
import emptyCv from './Utility/emptyCv';
import { v4 as uuidv4 } from 'uuid';
import { useReactToPrint } from 'react-to-print';

const Main = () => {
  const [cv, setCv] = useState(emptyCv);

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

  const handleChangeExperience = (e, id) => {
    const { name, value } = e.target;
    setCv((prevState) => {
      const newExperience = prevState.experience.map((experienceItem) => {
        if (experienceItem.id === id) {
          return { ...experienceItem, [name]: value };
        }
        return experienceItem;
      });
      return { ...prevState, experience: [...newExperience] };
    });
  };

  const handleAddExperience = (e) => {
    setCv((prevState) => ({
      ...prevState,
      experience: [
        ...prevState.experience,
        {
          id: uuidv4(),
          position: '',
          company: '',
          city: '',
          from: '',
          to: '',
        },
      ],
    }));
  };

  const handleDeleteExperience = (id) => {
    setCv((prevState) => {
      const newExperience = prevState.experience.filter(
        (experienceItem) => experienceItem.id !== id
      );
      return { ...prevState, experience: [...newExperience] };
    });
  };

  const handleChangeEducation = (e, id) => {
    const { name, value } = e.target;
    setCv((prevState) => {
      const newEducation = prevState.education.map((educationItem) => {
        if (educationItem.id === id) {
          return { ...educationItem, [name]: value };
        }
        return educationItem;
      });
      return { ...prevState, education: [...newEducation] };
    });
  };

  const handleAddEducation = (e) => {
    setCv((prevState) => ({
      ...prevState,
      education: [
        ...prevState.education,
        {
          id: uuidv4(),
          universityName: '',
          city: '',
          degree: '',
          subject: '',
          from: '',
          to: '',
        },
      ],
    }));
  };
  const handleDeleteEducation = (id) => {
    setCv((prevState) => {
      const newEducation = prevState.education.filter(
        (educationItem) => educationItem.id !== id
      );
      return { ...prevState, education: [...newEducation] };
    });
  };

  const handleChangeSkills = (e, id) => {
    const { name, value } = e.target;
    setCv((prevState) => {
      const newSkills = prevState.skills.map((skillsItem) => {
        if (skillsItem.id === id) {
          return { ...skillsItem, [name]: value };
        }
        return skillsItem;
      });
      return { ...prevState, skills: [...newSkills] };
    });

  }

  const handelAddSkills = (e) => {
    setCv((prevState) => ({
      ...prevState,
      skills: [
        ...prevState.skills,
        {
          id: uuidv4(),
          skill: '',
        },
      ],
    }));
  }

  const handleDeleteSkills = (id) => {
    setCv((prevState) => {
      const newSkills = prevState.skills.filter(
        (skillsItem) => skillsItem.id !== id
      );
      return { ...prevState, skills: [...newSkills] };
    });

  }

  const handleLoadExample = () => {
    setCv(exampleCV);
  };

  const handleReset = () => {
    setCv(emptyCv);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  return (
    <MainWrapper>
      <CvForm
        cv={cv}
        onChangePersonal={handleChangePersonal}
        onChangeExperience={handleChangeExperience}
        onAddExperience={handleAddExperience}
        onDeleteExperience={handleDeleteExperience}
        onChangeEducation={handleChangeEducation}
        onAddEducation={handleAddEducation}
        onDeleteEducation={handleDeleteEducation}
        onChangeSkills={handleChangeSkills}
        onAddSkills={handelAddSkills}
        onDeleteSkills={handleDeleteSkills}
        onPrint={handlePrint}
        onLoadExample={handleLoadExample}
        onReset={handleReset}
      />
      <CvPreview cv={cv} ref={componentRef} />
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  max-width: 1800px;
  padding: 4rem 8rem;
  margin: 0 auto;
  margin-bottom: 4rem;

  @media (max-width: 1600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default Main;
