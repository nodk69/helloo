import { useParams, useNavigate } from 'react-router-dom';
import { useGetGrievanceByIdQuery, useAddResolutionStepsMutation, useUpdateGrievanceMutation } from '../../api/grievancesApi';
import GrievanceCard from '../../components/grievances/GrievanceCard';
import ResolutionSteps from '../../components/grievances/ResolutionSteps';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import { useState } from 'react';

const GrievanceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddStepsModalOpen, setIsAddStepsModalOpen] = useState(false);
  const [newSteps, setNewSteps] = useState(['']);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState('');

  const { data: grievance, isLoading, isError, refetch } = useGetGrievanceByIdQuery(id);
  const [addSteps] = useAddResolutionStepsMutation();
  const [updateGrievance] = useUpdateGrievanceMutation();

  const handleAddStep = () => setNewSteps([...newSteps, '']);

  const handleStepChange = (index, value) => {
    const updatedSteps = [...newSteps];
    updatedSteps[index] = value;
    setNewSteps(updatedSteps);
  };

  const handleSubmitSteps = async () => {
    try {
      await addSteps({
        grievanceId: id,
        newSteps: newSteps.filter(step => step.trim() !== ''),
      }).unwrap();
      setIsAddStepsModalOpen(false);
      setNewSteps(['']);
      refetch();
    } catch (error) {
      console.error('Failed to add steps:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateGrievance({
        id,
        content: updatedContent || grievance.content,
      }).unwrap();
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Failed to update grievance:', error);
    }
  };

  if (isLoading) return <Loader className="my-8" />;
  if (isError) return <div className="text-red-500">Error loading grievance</div>;
  if (!grievance) return <div>Grievance not found</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Button
        variant="secondary"
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-500 hover:text-gray-700"
      >
        ← Back
      </Button>

      {isEditing ? (
        <div className="mb-6">
          <input
            type="text"
            defaultValue={grievance.title}
            className="text-2xl font-bold text-gray-800 mb-2 w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            defaultValue={grievance.content}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="text-gray-600 mb-2 w-full border border-gray-300 rounded-md px-3 py-2 h-24"
          />
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{grievance.title}</h1>
          <p className="text-gray-600 whitespace-pre-line">{grievance.content}</p>
        </div>
      )}

      <div className="border-t border-b border-gray-200 py-4 my-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Resolution Progress</h2>
        
        <ResolutionSteps 
          grievance={grievance} 
          isAdmin={false} 
          className="space-y-2" 
          itemClassName="flex items-center"
          checkboxClassName="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
          textClassName="ml-2"
        />

        <button
          onClick={() => setIsAddStepsModalOpen(true)}
          className="mt-3 text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <span className="mr-1">+</span> Add Step
        </button>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <p>Published on {new Date(grievance.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>Updated on {new Date(grievance.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button 
          variant="secondary"
          onClick={isEditing ? () => setIsEditing(false) : () => navigate(-1)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          {isEditing ? 'Cancel' : 'Back'}
        </Button>
        <Button
          variant="primary"
          onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isEditing ? 'Save Changes' : 'Edit'}
        </Button>
      </div>

      <Modal
        isOpen={isAddStepsModalOpen}
        onClose={() => setIsAddStepsModalOpen(false)}
        title="Add Resolution Step"
        className="bg-white rounded-lg p-6 shadow-xl max-w-md"
      >
        <div className="space-y-4">
          {newSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-600 transition"
                placeholder="Enter resolution step"
              />
              {index === newSteps.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="text-indigo-600 hover:text-indigo-800 transition text-xl"
                >
                  +
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsAddStepsModalOpen(false)}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitSteps}
              className="text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg py-2 px-6"
            >
              Add Step
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GrievanceDetailPage;