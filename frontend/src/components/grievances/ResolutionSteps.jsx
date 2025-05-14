import { useCompleteStepMutation, useApproveResolutionMutation } from '../../api/grievancesApi';
import Button from '../ui/Button';

const ResolutionSteps = ({ grievance, isAdmin }) => {
  const [completeStep] = useCompleteStepMutation();
  const [approveResolution] = useApproveResolutionMutation();

  const handleCompleteStep = async (step) => {
    try {
      await completeStep({ grievanceId: grievance.id, step }).unwrap();
    } catch (error) {
      console.error('Failed to complete step:', error);
    }
  };

  const handleApprove = async () => {
    try {
      await approveResolution(grievance.id).unwrap();
    } catch (error) {
      console.error('Failed to approve resolution:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900">Resolution Progress</h4>
      
      <div className="space-y-3">
        {/* Completed Steps */}
        {grievance.completedSteps?.map((step, index) => (
          <div key={`completed-${index}`} className="flex items-center">
            <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-green-500 mr-3">
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-600 line-through">{step}</span>
          </div>
        ))}

        {/* Pending Steps */}
        {grievance.resolutionSteps?.map((step, index) => (
          <div key={`pending-${index}`} className="flex items-center">
            <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-yellow-500 mr-3">
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-900">{step}</span>
            {isAdmin && (
              <Button
                variant="ghost"
                size="small"
                className="ml-auto"
                onClick={() => handleCompleteStep(step)}
              >
                Mark Complete
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Approval Section */}
      {grievance.status === 'RESOLVED' && !grievance.userApprovedResolution && !isAdmin && (
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            onClick={handleApprove}
            className="w-full sm:w-auto"
          >
            Approve Resolution
          </Button>
        </div>
      )}

      {grievance.userApprovedResolution && (
        <div className="pt-2">
          <p className="text-sm text-green-600">✓ Resolution approved by user</p>
        </div>
      )}
    </div>
  );
};

export default ResolutionSteps;