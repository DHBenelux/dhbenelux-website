import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath = isGitHubPagesBuild && repoName ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
