import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';
const token = process.env.SANITY_API_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to true for production
  perspective: 'published',
  stega: {
    enabled: false, // Set to true if you want to use the Visual Editing
  },
  token,
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'previewDrafts',
  ignoreBrowserTokenWarning: true,
});

export const getClient = (preview: boolean) => (preview ? previewClient : client);
