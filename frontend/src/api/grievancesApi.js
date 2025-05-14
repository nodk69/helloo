import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const grievanceApi = createApi({
  reducerPath: 'grievanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/grievances', // Update with your backend base URL
  }),
  tagTypes: ['Grievances'],
  endpoints: (builder) => ({
    // Create a new grievance
    createGrievance: builder.mutation({
      query: (grievance) => ({
        url: '',
        method: 'POST',
        body: grievance,
      }),
      invalidatesTags: ['Grievances'],
    }),

    // Get all grievances
    getAllGrievances: builder.query({
      query: () => '',
      providesTags: ['Grievances'],
    }),

    // Get grievance by ID
    getGrievanceById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Grievances', id }],
    }),

    // Get grievances by status
    getGrievancesByStatus: builder.query({
      query: (status) => `/status/${status}`,
      providesTags: ['Grievances'],
    }),

    // Complete a step in a grievance
    completeStep: builder.mutation({
      query: ({ id, step }) => ({
        url: `/${id}/complete-step`,
        method: 'PUT',
        params: { step },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Grievances', id }],
    }),

    // Approve grievance resolution
    approveResolution: builder.mutation({
      query: (id) => ({
        url: `/${id}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Grievances', id }],
    }),

    // Add new resolution steps
    addResolutionSteps: builder.mutation({
      query: ({ id, steps }) => ({
        url: `/${id}/steps`,
        method: 'PUT',
        body: steps,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Grievances', id }],
    }),
  }),
});

export const {
  useCreateGrievanceMutation,
  useGetAllGrievancesQuery,
  useGetGrievanceByIdQuery,
  useGetGrievancesByStatusQuery,
  useCompleteStepMutation,
  useApproveResolutionMutation,
  useAddResolutionStepsMutation,
} = grievanceApi;
