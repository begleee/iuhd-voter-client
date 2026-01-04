import url from "../utils/url";

export async function fetchGroups() {
  const res = await fetch(url +'/group/all');
  const data = await res.json();
  return data.groups;
}

export async function fetchQuestions() {
  const res = await fetch(url + "/question/all");
  const data = await res.json();
  return data;
}

export async function fetchTeachers(id) {
  const res = await fetch(url + "/teacher/group/" + id);
  const data = await res.json();
  return data;
}

export async function sendRates(rate) {
  const response = await fetch(url + "/teacher/rate", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rate),
  });
  return response;
}
