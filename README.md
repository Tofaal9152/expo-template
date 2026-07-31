# Ra Physics App

Expo Router + React Native app. Ei project e API call, auth token handling, query cache, mutation, toast, routing already common wrapper diye setup kora ache. New feature add korar somoy direct `axios` call na kore existing service/hook pattern follow koro.

## Run Locally

1. Dependencies install:

   ```bash
   npm install
   ```

2. `.env` file e backend URL set koro:

   ```env
   EXPO_PUBLIC_BACKEND_URL=https://your-backend-url.com
   ```

   Jodi env na thake, default backend use hobe:

   ```ts
   https://telemedicine-ru-server.onrender.com
   ```

3. App start:

   ```bash
   npm run start
   ```

4. Android build/run:

   ```bash
   npm run android
   ```

5. Lint:

   ```bash
   npm run lint
   ```

## Project Structure

```txt
src/
  app/                 Expo Router screens and layouts
  components/          Shared UI components
  features/            Feature-wise code: auth, patient, chat, call
  hooks/               Reusable app hooks
  lib/                 API client, request wrapper, env, socket, storage
  providers/           App-level providers
  store/               Zustand stores
  types/               Shared TypeScript types
  utils/               Helper functions
```

Import alias use kora jabe:

```ts
import { request } from "@/lib/request";
import { useFetchData } from "@/hooks/useFetchData";
```

## API Setup

API base client ache `src/lib/api.ts` e.

- `baseURL` ashe `src/lib/env.ts` theke.
- Auth token thakle automatically `Authorization: Bearer <token>` header add hoy.
- Backend `401` return korle auth store reset hoy.

Request helper ache `src/lib/request.ts` e:

```ts
request.get<T>(url);
request.post<TResponse, TBody>(url, body);
request.put<TResponse, TBody>(url, body);
request.patch<TResponse, TBody>(url, body);
request.delete<T>(url);
```

Ei helper response er `data` directly return kore, tai component/service e `res.data.data` type extra axios handling korte hoy na unless backend response structure emon hoy.

## GET API Call Pattern

GET API er jonno `useFetchData` use koro. Eta TanStack Query diye cache, loading, error state handle kore.

Example:

```ts
import { useFetchData } from "@/hooks/useFetchData";

export const SPECIALIZATIONS_QUERY_KEY = "specializations";

export function useGetSpecializations() {
  return useFetchData<any>({
    url: "/public/all-doctors-specialty",
    querykey: [SPECIALIZATIONS_QUERY_KEY],
  });
}
```

Component e use:

```tsx
const { data, isLoading, error, refetch } = useGetSpecializations();
```

## Query Params

Query params manually string concatenate na kore `makeEndpoint` use koro. Empty value, `null`, `undefined` automatically skip hoy.

```ts
import { useFetchData } from "@/hooks/useFetchData";
import { makeEndpoint } from "@/utils/makeEndpoint";

export const SEARCH_DOCTOR = "search-doctor";

export function useGetSearchResults({
  query,
  specialty,
  page,
}: {
  query: string;
  specialty: string;
  page: number;
}) {
  const endpoint = makeEndpoint("/public/doctors/approved", {
    query,
    specialty,
    page,
    limit: 10,
  });

  return useFetchData<any>({
    url: endpoint,
    querykey: [SEARCH_DOCTOR, query, specialty, page],
  });
}
```

## POST/PUT/PATCH/DELETE API Call Pattern

Create, update, delete type API er jonno `useMutationHandler` use koro. Eta success/error toast, query invalidate, callback handle kore.

Example POST:

```ts
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/request";

type CreateAppointmentBody = {
  doctorId: string;
};

export function useCreateAppointmentMutation() {
  return useMutationHandler<any, CreateAppointmentBody>({
    mutationFn: (data) => request.post("/appointments", data),
    invalidateKeys: [["appointments"]],
    successMessage: {
      title: "Appointment Created",
      description: "Your appointment has been created.",
    },
    showErrorToast: true,
  });
}
```

Component e use:

```tsx
const { mutate, isPending } = useCreateAppointmentMutation();

mutate({
  doctorId: selectedDoctorId,
});
```

Example payment flow:

```ts
export function usePaymentMutation() {
  return useMutationHandler({
    mutationFn: (data: PaymentData) => {
      return request.post("/appointments/payment", {
        doctorId: data.doctorId,
      });
    },
    showSuccessToast: false,
    showErrorToast: true,
    onSuccess(data: any) {
      const paymentUrl = data?.payment_url;
      if (!paymentUrl) return;

      router.push(
        `/appointment/payment?paymentUrl=${encodeURIComponent(paymentUrl)}`,
      );
    },
  });
}
```

## Auth Flow

Auth state `src/store/authStore.ts` e Zustand + SecureStore diye persist hoy.

Login success hole store e set korte hobe:

```ts
const { setRole, setIsLoggedIn, setToken, setUserId } =
  useAuthStore.getState();

setRole(user.role.toLowerCase());
setUserId(user.id);
setToken(accessToken);
setIsLoggedIn(true);
```

Tarpor `src/app/_layout.tsx` automatically route protect kore:

- logged out: `(auth)`
- logged in: `(protected)`

## New Feature Add Korar Recommended Flow

1. Feature folder create koro:

   ```txt
   src/features/protected/patient/tabs/example/
     services/
     schemas/
     ui/
   ```

2. API code `services/*.service.ts` e rakho.

3. GET hole `useFetchData` use koro.

4. POST/PUT/PATCH/DELETE hole `useMutationHandler` + `request` use koro.

5. Query params thakle `makeEndpoint` use koro.

6. Form validation thakle `schemas/` e Zod schema rakho.

7. Screen/component e sudhu hook call kore UI render koro.

## Coding Rules

- Direct `axios.get/post` feature file e use korbe na. `request` helper use koro.
- Query key stable rakho, example: `["appointments", page]`.
- Mutation success e related GET query refresh korte `invalidateKeys` use koro.
- Sensitive token manually AsyncStorage e rakho na. Auth store already SecureStore use kore.
- Reusable UI `src/components` e rakho, feature-specific UI `features/.../ui` e rakho.
- Common logic duplicate na kore `src/hooks`, `src/utils`, ba `src/lib` e move koro.

## Useful Files

- API client: `src/lib/api.ts`
- Request helper: `src/lib/request.ts`
- Env config: `src/lib/env.ts`
- GET hook: `src/hooks/useFetchData.ts`
- Mutation hook: `src/hooks/useMutationHandler.ts`
- Query builder: `src/utils/makeEndpoint.ts`
- Auth store: `src/store/authStore.ts`
- App providers: `src/providers/AppProviders.tsx`
