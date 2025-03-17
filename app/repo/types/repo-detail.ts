export type RepoDetail = {
  name: string; // Repository 이름
  description: string; // 설명
  stargazers_count: number; // Star ⭐, Fork 🍴 개수
  language: string; // Primary language
  open_issues_count: number; // Open Issues 수
  html_url: string; // 링크: GitHub 페이지로 이동
};
