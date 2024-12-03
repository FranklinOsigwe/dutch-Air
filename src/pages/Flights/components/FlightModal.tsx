import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

import Modal from "components/Modal";
import Input from "components/Input";
import { IFlightData } from "services";

interface IProps {
  isEditMode: boolean
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  defaultValues:
    | Readonly<{
        code?: string | undefined;
        capacity?: number | undefined;
        departureDate?: string | undefined;
      }>
    | undefined;
  register: UseFormRegister<IFlightData>;
  errors?: any;
  isPending: boolean
}

const FlightModal = (props: IProps) => {
  const {
    isEditMode,
    handleSubmit,
    setShowModal,
    showModal,
    defaultValues,
    register,
    errors,
    isPending
  } = props;

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[400px]">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit' : 'Create'} Flight</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <Input
              label="Code:"
              name="code"
              defaultValue={defaultValues?.code || ""}
              register={register}
              errorMessage={errors?.code?.message}
            />
          </div>

          <div className="mb-4">
            <Input
              valueAsNumber
              type="number"
              label="Capacity:"
              name="capacity"
              defaultValue={defaultValues?.capacity?.toString() || ""}
              register={register}
              errorMessage={errors?.capacity?.message}
            />
          </div>

          <div className="mb-4">
            <Input
              label="Departure Date:"
              name="departureDate"
              defaultValue={defaultValues?.departureDate || ""}
              register={register}
              errorMessage={errors?.departureDate?.message}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              disabled={isPending}
            >
              {isPending ? 'Submitting': 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FlightModal;
