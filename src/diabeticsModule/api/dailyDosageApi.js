import {
  axiosInstance,
  createEndpoint,
  handleApiError,
  handleApiResponse,
} from './config';

// Add new daily dosage
export const addDailyDosage = (dosageData) =>
  axiosInstance
    .post(createEndpoint('/dailyDosage/add'), dosageData)
    .then(handleApiResponse)
    .catch(handleApiError);

// Get daily dosage count
export const getDailyDosageCount = () =>
  axiosInstance
    .get(createEndpoint('/dailyDosage/count'))
    .then(handleApiResponse)
    .catch(handleApiError);

// Get patient's daily dosage by date
export const getPatientDailyDosageByDate = (date) =>
  axiosInstance
    .get(createEndpoint(`/dailyDosage/me/date/${date}`))
    .then(handleApiResponse)
    .catch(handleApiError);

// Get patient's daily dosage by date range
export const getPatientDailyDosageByRange = (startDate, endDate) =>
  axiosInstance
    .get(createEndpoint(`/dailyDosage/me/range/${startDate}/${endDate}`))
    .then(handleApiResponse)
    .catch(handleApiError);

// Get patient's latest daily dosage (for doctor's view)
export const getPatientLatestDosage = (patientId) =>
  axiosInstance
    .get(createEndpoint(`/dailyDosage/patient/${patientId}/latest`))
    .then(handleApiResponse)
    .catch(handleApiError);

// Get all daily dosages for a patient
export const getPatientAllDosages = (patientId) =>
  axiosInstance
    .get(createEndpoint(`/dailyDosage/patient/${patientId}`))
    .then(handleApiResponse)
    .catch(handleApiError);

//edit(put) the details
export const updateDailyDosage = async (patientId, dosage_id, updateData) => 
  {
  // Ensure date is properly formatted
  const formattedData = {
    ...updateData,
    date: updateData.date || new Date().toISOString().split('T')[0],
    bloodSugar: updateData.bloodSugar ? Number(updateData.bloodSugar) : undefined,
    carboLevel: updateData.carboLevel ? Number(updateData.carboLevel) : undefined,
    insulin: updateData.insulin ? Number(updateData.insulin) : undefined,
    longLastingInsulin: updateData.longLastingInsulin ? Number(updateData.longLastingInsulin) : undefined,
  };

  return axiosInstance
    .put(createEndpoint(`/dailyDosage/patient/${patientId}`), {
      _id: dosage_id,
      data: formattedData,
    })
    .then(handleApiResponse)
    .catch(handleApiError);
};