import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import locations from "../models/locations.json";
import deliveryMethods from "../models/deliveryMethods.json";

function DeliveryForm() {
	const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm({
		defaultValues: { name: "", surname: "", middlename: "", deliveryMethod: "", deliveryAddress: "", },
		mode: "onBlur",
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const myHandler = (data) => {
		const selectedDelivery = data.deliveryMethod;
		const isStorePickup = deliveryMethods.some(
			(method) => method.id === selectedDelivery && method.id.includes("Pickup")
		);

		const isCourier = deliveryMethods.some(
			(method) => method.id === selectedDelivery && method.id.includes("Courier")
		);

		if (isStorePickup && !data.storeLocation) {
			setError("general", { type: "deliveryMethod", message: "Пожалуйста, выберите отделение" });
			console.log(data);
			return;
		} else if (isCourier && !data.deliveryAddress) {
			setError("general", { type: "deliveryAddress", message: "Пожалуйста, введите адрес доставки" });
			console.log(data);
			return;
		} else {
			clearErrors("general");
			setIsSubmitted(true);
			console.log(data);
		}
	};

	const selectedDelivery = watch("deliveryMethod");

	const availableLocations = locations.filter(
		(location) => location.deliveryId === selectedDelivery
	);

	return (
		<>
			<form onSubmit={handleSubmit(myHandler)}>
				<div>
					<h3 className="d-flex justify-content-left mb-3">Доставка</h3>
					{deliveryMethods.map((method) => (
						<div className="form-check" key={method.id}>
							<div className="d-flex justify-content-between w-100">
								<div>
									<input className="form-check-input" type="radio" id={method.id} value={method.id} {...register("deliveryMethod", { required: "Пожалуйста, выберите способ доставки" })} />
									<label className="form-check-label" htmlFor={method.id}>{method.name}</label>
								</div>
								<div>
									<span>{method.price}</span>
								</div>
							</div>

							{selectedDelivery === method.id && availableLocations.length > 0 && (
								<select className="form-select mt-2" {...register("storeLocation")} >
									<option value="">Выберите подходящее отделение</option>
									{availableLocations.map((location) => (<option key={location.id} value={location.id}>{location.name}</option>))}
								</select>
							)}

							{selectedDelivery === method.id && method.id.includes("Courier") && (
								<input type="text" className="form-control mt-2" placeholder="Введите ваш адрес" {...register("deliveryAddress")} autoComplete="off" />
							)}
						</div>
					))}

					{errors.general && <span className="text-danger">{errors.general.message}</span>}
					{errors.deliveryMethod && <span className="text-danger">{errors.deliveryMethod.message}</span>}
				</div>

				<div className="row mt-5">
					<h3 className="d-flex justify-content-left mb-3">Получатель</h3>
					<div className="col-md-6">
						<div className="mb-3">
							<label htmlFor="exampleInputName1" className="form-label text-start w-100">Имя</label>
							<input type="text" className="form-control" {...register("name", { required: "Пожалуйста, введите имя" })} autoComplete="off" />
							{errors.name && (<span className="text-danger">{errors.name.message}</span>)}
						</div>

						<div className="mb-3">
							<label htmlFor="exampleInputMiddlename1" className="form-label text-start w-100">Отчество</label>
							<input type="text" className="form-control" {...register("middlename", { required: "Пожалуйста, введите отчетство", })} autoComplete="off" />
							{errors.middlename && (<span className="text-danger">{errors.middlename.message}</span>)}
						</div>
					</div>

					<div className="col-md-6">
						<div className="mb-3">
							<label htmlFor="exampleInputSurname1" className="form-label text-start w-100">Фамилия</label>
							<input type="text" className="form-control" {...register("surname", { required: "Пожалуйста, введите фамилию", })} autoComplete="off" />
							{errors.surname && (<span className="text-danger">{errors.surname.message}</span>)}
						</div>

						<div className="mb-3">
							<label htmlFor="exampleInputPhoneNumber1" className="form-label text-start w-100">Номер телефона</label>
							<input type="text" className="form-control" defaultValue="+380" {...register("phone", {
								required: "Пожалуйста, введите номер телефона", pattern: {
									value: /^\+380\d{9}$/, message: "Неправильний формат номера",
								}, onChange: (e) => {
									if (!e.target.value.startsWith("+380")) {
										e.target.value = "+380";
									}
								}
							})}
								autoComplete="off"
							/>
							{errors.phone && (<span className="text-danger">{errors.phone.message}</span>)}
						</div>
					</div>
				</div>

				<button className="btn btn-primary mt-4">Оформить заказ</button>
			</form>

			{isSubmitted && (<div className="mt-3 alert alert-success">Заказ оформлен</div>)}
		</>
	);
}

export default DeliveryForm;
