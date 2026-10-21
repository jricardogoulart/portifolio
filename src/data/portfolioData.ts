// Portfolio data and verified project facts

export interface SocialLink {
  label: string;
  url: string;
}

export interface Persona {
  firstName: string;
  lastName: string;
  fullName: string;
  monogram: string;
  role: string;
  practice: string;
  bio: string;
  education: string;
  email: string | null;
  location: string;
  socialLinks: SocialLink[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  repository: string;
  year: string;
  discipline: string;
  role: string;
  summary: string;
  technologies: string[];
  features: string[];
  approach: string;
  deliverables: string[];
  coverKey: string;
  projectType: string;
  featuredLines?: string[];
  caption: string;
  url: string;
  deployUrl?: string;
  sourceUrls: string[];
  note: string;
}

export interface Service {
  id: string;
  title: string;
  scope: string;
  text: string;
  deliverables: string;
}

export const PERSONA: Persona = {
  firstName: "José",
  lastName: "Goulart",
  fullName: "José Ricardo Goulart",
  monogram: "JG",
  role: "SOFTWARE DEVELOPER & SYSTEMS ANALYST",
  practice: "React, TypeScript e Node.js. Código, interfaces e soluções web.",
  bio: "José Ricardo Goulart, formado em Análise e Desenvolvimento de Sistemas pela Fatec Franca. Foco em aplicações web, interfaces reativas e código limpo.",
  education: "Análise e Desenvolvimento de Sistemas · Fatec Franca",
  email: "jricardogoulart@gmail.com",
  location: "Franca, SP · Brasil",
  socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jos%C3%A9-ricardo-goulart-ab622a288/" },
    { label: "GitHub", url: "https://github.com/jricardogoulart" },
    { label: "Instagram", url: "https://instagram.com/jricardogt" }
  ]
};

export const BACKUP_HERO = "/images/profile/jose-goulart.jpg";

export const BUILTIN_ART: Record<string, string> = {
  portfolio: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNlNmUyZDgiLz48ZyBzdHJva2U9IiNiY2I2YTkiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTUwIDB2ODAwTTIyNSAwdjgwME00MDAgMHY4MDBNNTc1IDB2ODAwTTc1MCAwdjgwME0wIDUwaDgwME0wIDIyNWg4MDBNMCA0MDBoODAwTTAgNTc1aDgwME0wIDc1MGg4MDAiLz48L2c+PHBhdGggZD0iTTQwMCA1MGgxNzV2MTc1SDQwMHpNNTAgMjI1aDE3NXYxNzVINTB6TTU3NSA0MDBoMTc1djE3NUg1NzV6TTIyNSA1NzVoMTc1djE3NUgyMjV6IiBmaWxsPSIjMTcxNzE3Ii8+PHJlY3QgeD0iNDAwIiB5PSI0MDAiIHdpZHRoPSIxNzUiIGhlaWdodD0iMTc1IiBmaWxsPSIjZmY2MzBmIi8+PHBhdGggZD0ibTQyOSA0NDUgMjUgMjUtMjUgMjVtNjMgMCAyNS0yNS0yNS0yNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTExIiBzdHJva2Utd2lkdGg9IjYiLz48ZyBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZmlsbD0iIzExMSI+PHRleHQgeD0iNjQiIHk9IjE0NCIgZm9udC1zaXplPSI2NyIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9Ii01Ij5QT1JURsOTTElPPC90ZXh0Pjx0ZXh0IHg9IjIzNiIgeT0iMzI3IiBmb250LXNpemU9IjExMiIgZm9udC13ZWlnaHQ9IjQwMCIgbGV0dGVyLXNwYWNpbmc9Ii05Ij5KRzwvdGV4dD48dGV4dCB4PSI2NyIgeT0iNzAxIiBmb250LXNpemU9IjEyIiBsZXR0ZXItc3BhY2luZz0iMSI+Q8OTRElHTywgSU5URVJGQUNFPC90ZXh0Pjx0ZXh0IHg9IjY3IiB5PSI3MjQiIGZvbnQtc2l6ZT0iMTIiIGxldHRlci1zcGFjaW5nPSIxIj4mYW1wOyBFWFBSRVNTw4NPLjwvdGV4dD48dGV4dCB4PSI1OTEiIHk9IjcwOCIgZm9udC1zaXplPSIxMCI+UkVBQ1QgLyBUWVBFU0NSSVBUPC90ZXh0Pjx0ZXh0IHg9IjU5MSIgeT0iNzI4IiBmb250LXNpemU9IjEwIj5XRUIgLyAyMDI2PC90ZXh0PjwvZz48cGF0aCBkPSJNNjExIDI2Nmg4MHY4MG0wLTgwLTgwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjYzMGYiIHN0cm9rZS13aWR0aD0iMTAiLz48L3N2Zz4=",
  summer: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNlYWU1ZGEiLz48cmVjdCB4PSIzNSIgeT0iMzUiIHdpZHRoPSI3MzAiIGhlaWdodD0iNzMwIiBmaWxsPSIjMTExIi8+PGcgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiPjx0ZXh0IHg9IjYzIiB5PSI3OCIgZmlsbD0iI2VlZTlkZCIgZm9udC1zaXplPSIxMSIgbGV0dGVyLXNwYWNpbmc9IjIiPlBST0RVVE9TIC8gQ0FURUdPUklBUyAvIFdFQjwvdGV4dD48dGV4dCB4PSI1MyIgeT0iMjUxIiBmaWxsPSIjZWVlOWRkIiBmb250LXNpemU9IjE1MyIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9Ii0xMSI+c3VtbWVyLjwvdGV4dD48L2c+PHBhdGggZD0iTTM1IDI4NGg3MzB2MzY1SDM1eiIgZmlsbD0iI2ZmNjMwZiIvPjxlbGxpcHNlIGN4PSI0MDEiIGN5PSI0NjYiIHJ4PSIyMjYiIHJ5PSIxNTEiIGZpbGw9IiMxNTE1MTUiIHRyYW5zZm9ybT0icm90YXRlKC0yNCA0MDEgNDY2KSIvPjxlbGxpcHNlIGN4PSI0MDUiIGN5PSI0NjEiIHJ4PSIxMTgiIHJ5PSIxNDYiIGZpbGw9IiNlYWU1ZGEiIHRyYW5zZm9ybT0icm90YXRlKC0yNCA0MDUgNDYxKSIvPjxlbGxpcHNlIGN4PSI0MDUiIGN5PSI0NjEiIHJ4PSI3MiIgcnk9Ijk4IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTEiIHN0cm9rZS13aWR0aD0iMyIgdHJhbnNmb3JtPSJyb3RhdGUoLTI0IDQwNSA0NjEpIi8+PHBhdGggZD0iTTM1IDU2NSA3NjUgMzQ3TTM1IDU5MCA3NjUgMzcyIiBzdHJva2U9IiNlYWU1ZGEiLz48ZyBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZmlsbD0iI2VlZTlkZCI+PHRleHQgeD0iNjIiIHk9IjY5MSIgZm9udC1zaXplPSIxMiIgbGV0dGVyLXNwYWNpbmc9IjIiPlNVTU1FUiBTUE9SVCBCQVIgLyBDQVJEw4FQSU8gRElHSVRBTDwvdGV4dD48dGV4dCB4PSI2MiIgeT0iNzI5IiBmb250LXNpemU9IjI5IiBsZXR0ZXItc3BhY2luZz0iLTEiPkRvIGNhdMOhbG9nbyDDoCBjb252ZXJzYS48L3RleHQ+PHRleHQgeD0iNjg0IiB5PSI3MjYiIGZvbnQtc2l6ZT0iMzYiIGxldHRlci1zcGFjaW5nPSItMyI+MDI8L3RleHQ+PC9nPjwvc3ZnPg==",
  finance: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNlN2UxZDYiLz48ZyBzdHJva2U9IiNiZGI2YTgiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTQ1IDIyMGg3MTBNNDUgMzUwaDcxME00NSA0ODBoNzEwTTQ1IDYxMGg3MTBNNDUgMjIwdjM5ME0xODUgMjIwdjM5ME0zMjUgMjIwdjM5ME00NjUgMjIwdjM5ME02MDUgMjIwdjM5ME03NTUgMjIwdjM5MCIvPjwvZz48ZyBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZmlsbD0iIzExMSI+PHRleHQgeD0iNDUiIHk9IjExMiIgZm9udC1zaXplPSI4MCIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9Ii02Ij5wcm9maW5hbmNlPC90ZXh0Pjx0ZXh0IHg9IjQ5IiB5PSIxNTAiIGZvbnQtc2l6ZT0iMTAiIGxldHRlci1zcGFjaW5nPSIyIj5DT05UQVMgLyBUUkFOU0HDh8OVRVMgLyBSRUxBVMOTUklPUzwvdGV4dD48L2c+PHBhdGggZD0iTTQ1IDYwMiAxODUgNDk4IDMyNSA1MzkgNDY1IDM2OCA2MDUgMzk5IDc1NSAyNDciIHN0cm9rZT0iI2ZmNjMwZiIgc3Ryb2tlLXdpZHRoPSIyNiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00NSA2MDIgMTg1IDQ5OCAzMjUgNTM5IDQ2NSAzNjggNjA1IDM5OSA3NTUgMjQ3djM2M0g0NVoiIGZpbGw9IiNmZjYzMGYiIG9wYWNpdHk9Ii4xMiIvPjxjaXJjbGUgY3g9IjQ2NSIgY3k9IjM2OCIgcj0iNTIiIGZpbGw9IiMxMTEiLz48Y2lyY2xlIGN4PSI0NjUiIGN5PSIzNjgiIHI9IjE1IiBmaWxsPSIjZTdlMWQ2Ii8+PHJlY3QgeD0iNDUiIHk9IjY1MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzExMSIvPjxnIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBsZXR0ZXItc3BhY2luZz0iMSI+PHRleHQgeD0iNjkiIHk9IjY4NSIgZmlsbD0iI2VlZSI+RUxFQ1RST04gKyBTUUxJVEU8L3RleHQ+PHRleHQgeD0iNTg4IiB5PSI2ODUiIGZpbGw9IiMxMTEiPkFQTElDQcOHw4NPIERFU0tUT1A8L3RleHQ+PC9nPjx0ZXh0IHg9IjQ1IiB5PSI3NTUiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBsZXR0ZXItc3BhY2luZz0iMiIgZmlsbD0iIzE3MTcxNyI+SUxVU1RSQcOHw4NPIENPTkNFSVRVQUwgLyAyMDI1PC90ZXh0Pjwvc3ZnPg==",
  mars: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiMxNTE1MTUiLz48Y2lyY2xlIGN4PSI0MDYiIGN5PSI0MDMiIHI9IjI3OCIgZmlsbD0iI2ZmNjMwZiIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE1MTUxNSIgc3Ryb2tlLXdpZHRoPSIyIj48ZWxsaXBzZSBjeD0iNDA2IiBjeT0iNDAzIiByeD0iMjc4IiByeT0iMTMwIi8+PGVsbGlwc2UgY3g9IjQwNiIgY3k9IjQwMyIgcng9IjIxMCIgcnk9IjI3OCIvPjxlbGxpcHNlIGN4PSI0MDYiIGN5PSI0MDMiIHJ4PSIxMjAiIHJ5PSIyNzgiLz48cGF0aCBkPSJNMTMwIDQwM2g1NTIiLz48L2c+PHBhdGggZD0iTTAgNjM5IDE3MCA1MjIgMzIzIDU2OSA1MTIgNDUxIDgwMCA2NDd2MTUzSDBaIiBmaWxsPSIjZThlMmQ4Ii8+PHBhdGggZD0ibTIzMCA2MjUgODctNTdoMTg1bDY4IDU3djM2SDIzMFoiIGZpbGw9IiMxMTEiLz48Y2lyY2xlIGN4PSIyNjkiIGN5PSI2NjMiIHI9IjMyIiBmaWxsPSIjMTExIi8+PGNpcmNsZSBjeD0iNTMzIiBjeT0iNjYzIiByPSIzMiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik00MTcgNTY4di03MWg0ME00NTUgNDk3di00MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTExIiBzdHJva2Utd2lkdGg9IjgiLz48ZyBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZmlsbD0iI2VlZTdkYiI+PHRleHQgeD0iNDAiIHk9IjEwMyIgZm9udC1zaXplPSI5MSIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9Ii02Ij5tYXJzIHBob3RvczwvdGV4dD48dGV4dCB4PSI0NiIgeT0iMTM4IiBmb250LXNpemU9IjEwIiBsZXR0ZXItc3BhY2luZz0iMiI+VlVFLkpTIC8gTkFTQSBNQVJTIFJPVkVSIFBIT1RPUyBBUEk8L3RleHQ+PC9nPjx0ZXh0IHg9IjQ1IiB5PSI3NTUiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBsZXR0ZXItc3BhY2luZz0iMiIgZmlsbD0iIzE3MTcxNyI+RVhQTE9SQVIgLyBDT05TVUxUQVIgLyBWSVNVQUxJWkFSIOKAlCAyMDI0PC90ZXh0Pjwvc3ZnPg==",
  pokedex: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNlNmUwZDMiLz48ZyBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZmlsbD0iIzExMSI+PHRleHQgeD0iNDMiIHk9IjEyNiIgZm9udC1zaXplPSIxMDUiIGZvbnQtd2VpZ2h0PSI3MDAiIGxldHRlci1zcGFjaW5nPSItNyI+cG9rw6lkZXg8L3RleHQ+PHRleHQgeD0iNDgiIHk9IjE2NCIgZm9udC1zaXplPSIxMCIgbGV0dGVyLXNwYWNpbmc9IjIiPlZVRS5KUyAvIFBPS8OJQVBJIC8gRVhQTE9SQcOHw4NPIERFIERBRE9TPC90ZXh0PjwvZz48cmVjdCB4PSI0MCIgeT0iMjE3IiB3aWR0aD0iNzIwIiBoZWlnaHQ9IjQ1OCIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0yODAgMjE3djQ1OE01MjAgMjE3djQ1OE00MCA0NDdoNzIwIiBzdHJva2U9IiM3NzciLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSI0NDciIHI9IjE3MyIgZmlsbD0iI2U2ZTBkMyIvPjxwYXRoIGQ9Ik0yMjcgNDQ3YTE3MyAxNzMgMCAwIDEgMzQ2IDBaIiBmaWxsPSIjZmY2MzBmIi8+PHBhdGggZD0iTTIyNyA0NDdoMzQ2IiBzdHJva2U9IiMxMTEiIHN0cm9rZS13aWR0aD0iMjAiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSI0NDciIHI9IjY1IiBmaWxsPSIjZTZlMGQzIiBzdHJva2U9IiMxMTEiIHN0cm9rZS13aWR0aD0iMjAiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSI0NDciIHI9IjIzIiBmaWxsPSIjMTExIi8+PGcgZmlsbD0iI2ZmNjMwZiI+PHJlY3QgeD0iNjUiIHk9IjI0MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIi8+PHJlY3QgeD0iNTUwIiB5PSI1OTEiIHdpZHRoPSIxODMiIGhlaWdodD0iNTMiLz48L2c+PHRleHQgeD0iNDUiIHk9Ijc1NSIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGxldHRlci1zcGFjaW5nPSIyIiBmaWxsPSIjMTcxNzE3Ij5USVBPIC8gUEVTTyAvIEhBQklMSURBREVTIOKAlCAyMDI0PC90ZXh0Pjwvc3ZnPg==",
  calculator: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNlNmUwZDMiLz48cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSI3MjAiIGhlaWdodD0iNzIwIiBmaWxsPSIjMTExIi8+PGcgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZpbGw9IiNlNmUwZDMiPjx0ZXh0IHg9IjY4IiB5PSIxMDkiIGZvbnQtc2l6ZT0iNDkiIGxldHRlci1zcGFjaW5nPSItMyI+Y2FsY3VsYWRvcmEgdnVlPC90ZXh0Pjx0ZXh0IHg9IjczIiB5PSIxNDkiIGZvbnQtc2l6ZT0iMTAiIGxldHRlci1zcGFjaW5nPSIyIj5JTlRFUkZBQ0UgLyBFU1RBRE8gLyBPUEVSQcOHw5VFUzwvdGV4dD48L2c+PHJlY3QgeD0iNzIiIHk9IjE4NiIgd2lkdGg9IjY1NiIgaGVpZ2h0PSIxMzYiIGZpbGw9IiNlNmUwZDMiLz48dGV4dCB4PSI2ODgiIHk9IjI5MCIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTA0IiBsZXR0ZXItc3BhY2luZz0iLTgiIGZpbGw9IiMxMTEiPjAxICsgMDI8L3RleHQ+PGcgZmlsbD0iI2U2ZTBkMyI+PGNpcmNsZSBjeD0iMTc3IiBjeT0iNDM3IiByPSI2OSIvPjxjaXJjbGUgY3g9IjM5NyIgY3k9IjQzNyIgcj0iNjkiLz48Y2lyY2xlIGN4PSIxNzciIGN5PSI2MjUiIHI9IjY5Ii8+PGNpcmNsZSBjeD0iMzk3IiBjeT0iNjI1IiByPSI2OSIvPjwvZz48cmVjdCB4PSI1NDgiIHk9IjM2OCIgd2lkdGg9IjE0NSIgaGVpZ2h0PSIzMjYiIHJ4PSI3MCIgZmlsbD0iI2ZmNjMwZiIvPjxnIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmaWxsPSIjMTExIiBmb250LXNpemU9Ijk2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj48dGV4dCB4PSIxNzciIHk9IjQ3MCI+KzwvdGV4dD48dGV4dCB4PSIzOTciIHk9IjQ3MCI+4oiSPC90ZXh0Pjx0ZXh0IHg9IjE3NyIgeT0iNjU3Ij7DlzwvdGV4dD48dGV4dCB4PSIzOTciIHk9IjY1NyI+w7c8L3RleHQ+PHRleHQgeD0iNjIyIiB5PSI1NjQiPj08L3RleHQ+PC9nPjwvc3ZnPg==",
  statement: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNzIwIiB2aWV3Qm94PSIwIDAgNjAwIDcyMCI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNzIwIiBmaWxsPSIjZTVlMGQ1Ii8+CjxnIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmaWxsPSIjMTExIj4KPHRleHQgeD0iMzIiIHk9IjQ4IiBmb250LXNpemU9IjIyIiBsZXR0ZXItc3BhY2luZz0iLTEiPkEgU1RVRFkgT0YgUkVMQVRJT05TSElQUzwvdGV4dD4KPHRleHQgeD0iMzIiIHk9Ijc1IiBmb250LXNpemU9IjEwIiBsZXR0ZXItc3BhY2luZz0iMiI+Rk9STSAvIFNQQUNFIC8gQ09VTlRFUkZPUk0g4oCUIDAx4oCTMDY8L3RleHQ+CjwvZz4KPGcgc3Ryb2tlPSIjYTVhMDk2IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTMyIDk2aDUzNk0zMiAxMTB2NTMwTTI5OCAxMTB2NTMwTTU2OCAxMTB2NTMwTTMyIDI4MGg1MzZNMzIgNDYwaDUzNk0zMiA2NDBoNTM2Ii8+CjwvZz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAgMTI4ICkiPgo8cmVjdCB3aWR0aD0iMjA1IiBoZWlnaHQ9IjEyMiIgZmlsbD0iIzE0MTQxNCIvPgo8Y2lyY2xlIGN4PSIxMDMiIGN5PSI2MSIgcj0iNDUiIGZpbGw9IiNlNWUwZDUiLz4KPHJlY3QgeD0iODMiIHk9Ii0yIiB3aWR0aD0iNDAiIGhlaWdodD0iMTI2IiBmaWxsPSIjZmY2MzBmIi8+CjwvZz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzI2IDEyOCkiIGZpbGw9IiMxNzE3MTciPgo8cGF0aCBkPSJNMCAxMjIgMTA1IDAgMjA1IDEyMloiLz4KPHBhdGggZD0iTTQwIDEyMiAxMDUgNTAgMTcwIDEyMloiIGZpbGw9IiNlNWUwZDUiLz4KPC9nPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MCAzMDUpIj4KPHJlY3Qgd2lkdGg9IjIwNSIgaGVpZ2h0PSIxMjUiIGZpbGw9IiNmZjYzMGYiLz4KPHBhdGggZD0iTTAgMCAyMDUgMTI1TTAgMjUgMTY1IDEyNU0wIDUwIDEyNSAxMjVNNDAgMCAyMDUgMTAwTTgwIDAgMjA1IDc1IiBzdHJva2U9IiMxMzEzMTMiIHN0cm9rZS13aWR0aD0iMTIiLz4KPC9nPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMjggMzAyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTcxNzE3IiBzdHJva2Utd2lkdGg9IjIiPgo8ZWxsaXBzZSBjeD0iMTAyIiBjeT0iNjQiIHJ4PSIxMDAiIHJ5PSI2MSIvPgo8ZWxsaXBzZSBjeD0iMTAyIiBjeT0iNjQiIHJ4PSI3NSIgcnk9IjYxIi8+CjxlbGxpcHNlIGN4PSIxMDIiIGN5PSI2NCIgcng9IjUwIiByeT0iNjEiLz4KPGVsbGlwc2UgY3g9IjEwMiIgY3k9IjY0IiByeD0iMjUiIHJ5PSI2MSIvPgo8cGF0aCBkPSJNMiA2NGgyMDAiLz4KPC9nPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MCA0ODMpIj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9Ijc2IiBoZWlnaHQ9IjEyNCIgZmlsbD0iIzExMSIvPgo8cmVjdCB4PSI5MiIgeT0iMCIgd2lkdGg9IjM0IiBoZWlnaHQ9IjEyNCIgZmlsbD0iI2ZmNjMwZiIvPjxyZWN0IHg9IjE0NCIgeT0iMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjEyNCIgZmlsbD0iIzExMSIvPgo8L2c+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMzMyA0ODMpIiBmaWxsPSIjMTMxMzEzIj4KPGNpcmNsZSBjeD0iNTUiIGN5PSI0NSIgcj0iNDUiLz4KPGNpcmNsZSBjeD0iMTMwIiBjeT0iNzgiIHI9IjQ1Ii8+CjxjaXJjbGUgY3g9IjkwIiBjeT0iNjEiIHI9IjIyIiBmaWxsPSIjZTVlMGQ1Ii8+CjwvZz4KPGcgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOSIgbGV0dGVyLXNwYWNpbmc9IjEiIGZpbGw9IiMzMzMiPgo8dGV4dCB4PSIzNiIgeT0iMjczIj4wMSAvIElOVEVSU0VDVElPTjwvdGV4dD4KPHRleHQgeD0iMzAyIiB5PSIyNzMiPjAyIC8gQUJTRU5DRTwvdGV4dD4KPHRleHQgeD0iMzYiIHk9IjQ1MyI+MDMgLyBSRVBFVElUSU9OPC90ZXh0Pjx0ZXh0IHg9IjMwMiIgeT0iNDUzIj4wNCAvIE9SQklUPC90ZXh0Pjx0ZXh0IHg9IjM2IiB5PSI2MzMiPjA1IC8gUkhZVEhNPC90ZXh0Pjx0ZXh0IHg9IjMwMiIgeT0iNjMzIj4wNiAvIFJFTEFUSU9OPC90ZXh0Pjx0ZXh0IHg9IjMyIiB5PSI2ODkiPlZJU1VBTCBSRVNFQVJDSCAvIE9SSUdJTkFMIEBDT05DRVBUIFNUVURJRVM8L3RleHQ+CjwvZz4KPC9zdmc+"
};

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "summer-cardapio",
    title: "Summer Cardápio",
    repository: "summer-cardapio",
    year: "2026",
    discipline: "Cardápio digital",
    role: "Repositório público de José Goulart",
    summary: "Um cardápio digital web responsivo desenvolvido para o Summer Sport Bar. Organiza produtos por categorias, com preços, descrições e fotos, incluindo compartilhamento dinâmico e realização de pedidos diretamente pelo WhatsApp. Em produção e com deploy ativo no GitHub Pages.",
    technologies: ["JavaScript", "HTML5", "CSS3", "CSV", "GitHub Pages"],
    features: [
      "Deploy oficial ativo e navegável via GitHub Pages.",
      "Leitura de produtos a partir de dados estruturados em CSV e filtragem por categoria.",
      "Ordenação alfabética, cartões de produto e modal de detalhes.",
      "Preços promocionais e badges condicionais.",
      "Ações de pedido e compartilhamento direto pelo WhatsApp.",
      "Compartilhamento nativo, cópia do link e alternância de tema."
    ],
    approach: "HTML5, CSS3 autoral e JavaScript moderno compõem a aplicação web de alta performance. Os dados estruturados abastecem o catálogo e os pedidos, proporcionando experiência mobile-first rápida e sem atrito para clientes.",
    deliverables: ["Aplicação web em produção", "Catálogo digital", "Integração WhatsApp"],
    coverKey: "summer",
    projectType: "Aplicação Web · Deploy GitHub Pages",
    featuredLines: ["SUMMER", "CARDÁPIO"],
    caption: "Cardápio digital em produção com WhatsApp e categorias",
    url: "https://github.com/jricardogoulart/summer-cardapio",
    deployUrl: "https://jricardogoulart.github.io/summer-cardapio/",
    sourceUrls: [
      "https://jricardogoulart.github.io/summer-cardapio/",
      "https://github.com/jricardogoulart/summer-cardapio",
      "https://raw.githubusercontent.com/jricardogoulart/summer-cardapio/main/index.html",
      "https://raw.githubusercontent.com/jricardogoulart/summer-cardapio/main/script.js"
    ],
    note: "Aplicação real em produção com deploy no GitHub Pages. Repositório com código-fonte público de José Ricardo Goulart."
  },
  {
    id: "02",
    slug: "profinance",
    title: "ProFinance",
    repository: "profinance",
    year: "2025",
    discipline: "Aplicação desktop",
    role: "Repositório público de José Goulart",
    summary: "Um sistema desktop de controle financeiro desenvolvido com Electron. O manifesto e as telas públicas mostram operações de contas, transações, dashboard e relatórios, com banco SQLite.",
    technologies: ["Electron", "JavaScript", "Node.js", "SQLite", "Tailwind CSS", "Decimal.js"],
    features: [
      "Cadastro, edição, listagem e exclusão de contas e transações de crédito ou débito.",
      "Atualização de saldos, dashboard consolidado e últimas movimentações.",
      "Consultas por conta, tipo e intervalo de datas.",
      "Relatórios de entradas, saídas, saldo acumulado e extrato detalhado.",
      "Backup e restauração do arquivo de banco por diálogos do sistema.",
      "Comunicação IPC via preload e isolamento de contexto Electron."
    ],
    approach: "O projeto reúne uma janela Electron, comunicação via preload e persistência SQLite com better-sqlite3. A descrição é baseada no package.json e nas telas e operações presentes no código público.",
    deliverables: ["Aplicativo desktop", "Contas e transações", "Relatórios e backup"],
    coverKey: "finance",
    projectType: "Aplicativo desktop · repositório público",
    caption: "Contas, transações e relatórios",
    url: "https://github.com/jricardogoulart/profinance",
    sourceUrls: [
      "https://github.com/jricardogoulart/profinance",
      "https://raw.githubusercontent.com/jricardogoulart/profinance/main/package.json",
      "https://raw.githubusercontent.com/jricardogoulart/profinance/main/main.js"
    ],
    note: "Recursos evidenciados no código e nas telas públicas. Ano de criação: 2025. As fontes não comprovam distribuição, uso ou estado de produção."
  },
  {
    id: "03",
    slug: "mars-photos",
    title: "Mars Photos",
    repository: "mars-photos",
    year: "2024",
    discipline: "Vue & API NASA",
    role: "Repositório público de José Goulart",
    summary: "Uma aplicação de estudo em Vue.js que consulta a API NASA Mars Rover Photos para exibir imagens de rovers de Marte. O README descreve busca por data, seleção de rover e galeria de fotos.",
    technologies: ["Vue.js 3", "JavaScript", "Axios", "Vue CLI", "NASA API"],
    features: [
      "Integração com a API da NASA para consultar fotos de Marte.",
      "Consulta de registros por data.",
      "Seleção dos rovers Curiosity, Opportunity e Spirit, descrita no README.",
      "Galeria de fotos e visualização ampliada, conforme o README.",
      "Componente HomePage e serviço de API separado no código público."
    ],
    approach: "Vue.js organiza a interface, enquanto Axios e um serviço separado tratam as consultas à API NASA Mars Rover Photos. O projeto é identificado no próprio repositório como estudo de consumo de API.",
    deliverables: ["Aplicação Vue", "Serviço de API", "Galeria de imagens"],
    coverKey: "mars",
    projectType: "Projeto de estudo · repositório público",
    caption: "Exploração de dados e imagens de Marte",
    url: "https://github.com/jricardogoulart/mars-photos",
    sourceUrls: [
      "https://github.com/jricardogoulart/mars-photos",
      "https://raw.githubusercontent.com/jricardogoulart/mars-photos/master/README.md",
      "https://raw.githubusercontent.com/jricardogoulart/mars-photos/master/package.json"
    ],
    note: "Tecnologias confirmadas no manifesto; recursos identificados no código ou atribuídos ao README. Ano de criação: 2024. Não é afirmada uma demonstração online ativa."
  },
  {
    id: "04",
    slug: "pokedex",
    title: "Pokédex",
    repository: "pokedex",
    year: "2024",
    discipline: "Vue & PokéAPI",
    role: "Repositório público de José Goulart",
    summary: "Uma Pokédex web construída com Vue.js via CDN e CSS personalizado. A aplicação consulta a PokéAPI e apresenta cartões com nome, imagem, tipo, peso e habilidades de Pokémon.",
    technologies: ["Vue.js 3", "JavaScript", "HTML", "CSS", "PokéAPI"],
    features: [
      "Consulta à PokéAPI em lotes de 60 itens.",
      "Carregamento incremental ao atingir o fim da página.",
      "Cartões com nome, imagem, tipo, peso e habilidades.",
      "Alternância de detalhes ao clicar, com rotação 3D do cartão.",
      "Grade flexível e estilos visuais associados ao tipo de Pokémon."
    ],
    approach: "A aplicação roda no navegador com Vue.js carregado via CDN. JavaScript consulta os dados da PokéAPI e controla os cartões e seu carregamento incremental; o CSS define a identidade e a rotação dos detalhes.",
    deliverables: ["Interface de consulta", "Cartões de detalhes", "Integração com PokéAPI"],
    coverKey: "pokedex",
    projectType: "Aplicação front-end · repositório público",
    caption: "Dados, tipos e exploração incremental",
    url: "https://github.com/jricardogoulart/pokedex",
    sourceUrls: [
      "https://github.com/jricardogoulart/pokedex",
      "https://raw.githubusercontent.com/jricardogoulart/pokedex/main/index.html",
      "https://raw.githubusercontent.com/jricardogoulart/pokedex/main/index.js"
    ],
    note: "Descrição baseada no código atual. Busca por nome ou tipo não foi confirmada e não é anunciada. Ano de criação: 2024."
  },
  {
    id: "05",
    slug: "calculadora-vue",
    title: "Calculadora Vue",
    repository: "CalculadoraVue",
    year: "2024",
    discipline: "Vue & fundamentos",
    role: "Repositório público de José Goulart",
    summary: "Uma calculadora web criada como exercício de Vue.js. A interface numérica permite operações aritméticas básicas, entrada decimal, exibição de resultado e limpeza do estado.",
    technologies: ["Vue.js", "JavaScript", "HTML", "CSS"],
    features: [
      "Entrada de números de 0 a 9 por botões.",
      "Adição, subtração, multiplicação e divisão.",
      "Entrada decimal, display de resultado e botão AC.",
      "Estilização de display e botões para operadores e igualdade."
    ],
    approach: "O código público usa Vue.createApp para controlar a entrada e as operações em uma página HTML e CSS. O resumo considera os arquivos existentes, sem anunciar componentes, testes ou licenças não encontrados.",
    deliverables: ["Calculadora web", "Operações básicas", "Interface numérica"],
    coverKey: "calculator",
    projectType: "Exercício de Vue.js · repositório público",
    caption: "Interface e lógica aritmética",
    url: "https://github.com/jricardogoulart/CalculadoraVue",
    sourceUrls: [
      "https://github.com/jricardogoulart/CalculadoraVue",
      "https://raw.githubusercontent.com/jricardogoulart/CalculadoraVue/main/CalculadoraVue/index.js",
      "https://raw.githubusercontent.com/jricardogoulart/CalculadoraVue/main/CalculadoraVue/index.html"
    ],
    note: "Resumo baseado no README e no código público. Ano de criação: 2024. Não são anunciados testes, componentes ou licença sem confirmação nos arquivos."
  }
];

export const SERVICES: Service[] = [
  {
    id: "01",
    title: "Front-end",
    scope: "React / TypeScript / Interfaces reativas",
    text: "React e TypeScript fazem parte do foco atual declarado no perfil. O repositório do portfólio reúne essa base em uma aplicação com tipografia editorial e interações visuais.",
    deliverables: "No GitHub: portfólio React/TypeScript e aplicações de estudo em Vue.js."
  },
  {
    id: "02",
    title: "APIs & dados",
    scope: "Integrações REST / Vue.js / SQLite",
    text: "O perfil declara interesse em APIs RESTful e integridade de dados. Mars Photos e Pokédex exploram APIs públicas; ProFinance evidencia persistência SQLite no código.",
    deliverables: "No GitHub: integrações com NASA e PokéAPI; contas e transações em SQLite."
  },
  {
    id: "03",
    title: "Aplicações",
    scope: "Web / Electron / Node.js",
    text: "Node.js integra o foco declarado no perfil. Os projetos públicos incluem experiências web e uma aplicação desktop de controle financeiro com Electron e comunicação via preload.",
    deliverables: "No GitHub: cardápio digital, portfólio pessoal e ProFinance desktop."
  }
];
