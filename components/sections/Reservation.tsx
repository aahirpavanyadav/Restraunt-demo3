"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { guestOptions, openingTimes, site } from "@/lib/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ChevronDown, Clock, Info, Phone } from "../ui/Icons";
import styles from "./Reservation.module.css";

type Fields = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
};

type FieldName = keyof Fields;
type Errors = Partial<Record<FieldName, string>>;

const initialFields: Fields = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  guests: "2",
  requests: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+()\d\s.-]+$/;

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const suffix = hours >= 12 ? "pm" : "am";
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, "0")}${suffix}`;
}

function validate(data: Fields): Errors {
  const errors: Errors = {};

  const name = data.name.trim();
  if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (name.length > 80) {
    errors.name = "Please keep your name under 80 characters.";
  }

  const phone = data.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Please enter a phone number.";
  } else if (!phonePattern.test(phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = "Enter a phone number we can reach you on.";
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.date) {
    errors.date = "Choose a date for your visit.";
  } else {
    const chosen = new Date(`${data.date}T12:00:00`);
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const max = new Date(todayStart);
    max.setMonth(max.getMonth() + 6);

    if (Number.isNaN(chosen.getTime())) {
      errors.date = "Choose a valid date.";
    } else if (chosen < todayStart) {
      errors.date = "Please choose today or a future date.";
    } else if (chosen > max) {
      errors.date = "We take requests up to six months ahead.";
    } else if (chosen.getDay() === 1) {
      errors.date = "We are closed on Mondays — please choose another day.";
    }
  }

  if (!data.time) {
    errors.time = "Choose a preferred time.";
  }

  if (!data.guests) {
    errors.guests = "Select the number of guests.";
  }

  if (data.requests.length > 400) {
    errors.requests = "Please keep requests under 400 characters.";
  }

  return errors;
}

export function Reservation() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState<Fields | null>(null);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const wasSubmitted = useRef(false);

  useEffect(() => {
    const today = new Date();
    setMinDate(toISODate(today));
    const max = new Date(today);
    max.setMonth(max.getMonth() + 6);
    setMaxDate(toISODate(max));
  }, []);

  useEffect(() => {
    if (submitted) {
      wasSubmitted.current = true;
      successRef.current?.focus();
    } else if (wasSubmitted.current) {
      wasSubmitted.current = false;
      formHeadingRef.current?.focus();
    }
  }, [submitted]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name as FieldName;
    const value = event.target.value;

    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name as FieldName;
    const result = validate(fields);
    setErrors((current) => ({ ...current, [name]: result[name] }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    const result = validate(fields);
    setErrors(result);

    const firstError = Object.keys(result)[0] as FieldName | undefined;
    if (firstError) {
      const field = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstError}"]`,
      );
      field?.focus();
      return;
    }

    setSubmitted({ ...fields });
  };

  const editRequest = () => {
    setSubmitted(null);
    setHasSubmitted(false);
  };

  const errorCount = Object.keys(errors).filter((key) => errors[key as FieldName])
    .length;

  return (
    <section
      id="reserve"
      className={`section ${styles.reservation}`}
      aria-labelledby="reserve-title"
    >
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <SectionHeading
              id="reserve-title"
              eyebrow="Reservations"
              title={
                <>
                  Your table,
                  <br />
                  <em>when you&rsquo;re ready.</em>
                </>
              }
              description="We hold a handful of tables for walk-ins, but a little notice always helps. Tell us when you would like to join us."
            />
          </Reveal>
          <Reveal delay={120} className={styles.headAside}>
            <span>Prefer to call?</span>
            <a href={site.phoneHref} className="text-link">
              {site.phone}
            </a>
            <p>Tuesday to Sunday, from 10am.</p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          <Reveal className={styles.imagePanel}>
            <Image
              src="/images/interior-warm.jpg"
              alt="Warmly lit dining room with leather banquettes set for evening service"
              fill
              quality={82}
              sizes="(max-width: 1023px) 100vw, 42vw"
            />
            <div className={styles.imageScrim} aria-hidden="true" />
            <div className={styles.imageContent}>
              <span className={styles.imageEyebrow}>Evenings at Aurelia</span>
              <p className={styles.imageQuote}>
                “The room fills, the candles are lit, and the evening takes its
                time.”
              </p>
              <p className={styles.imageHours}>
                <Clock />
                Tuesday – Sunday · 5.30pm until late
              </p>
              <a href={site.phoneHref} className={styles.imageCall}>
                <Phone />
                <span>{site.phone}</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className={styles.formCard}>
            {submitted ? (
              <div className={styles.success} role="status" aria-live="polite">
                <div className={styles.successTop}>
                  <span className={styles.successIcon} aria-hidden="true">
                    <Info />
                  </span>
                  <p className="eyebrow">Demo form</p>
                </div>
                <h3 ref={successRef} tabIndex={-1}>
                  Your request wasn&rsquo;t sent.
                </h3>
                <p className={styles.successText}>
                  This concept site isn&rsquo;t connected to a reservations
                  system, so no data was transmitted or stored and no table has
                  been held. To book for real, call us on{" "}
                  <a href={site.phoneHref}>{site.phone}</a> or email{" "}
                  <a href={site.emailHref}>{site.email}</a>.
                </p>

                <dl className={styles.summary}>
                  <div>
                    <dt>Name</dt>
                    <dd>{submitted.name}</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>{formatDate(submitted.date)}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{formatTime(submitted.time)}</dd>
                  </div>
                  <div>
                    <dt>Guests</dt>
                    <dd>
                      {submitted.guests}{" "}
                      {submitted.guests === "1" ? "guest" : "guests"}
                    </dd>
                  </div>
                  {submitted.requests ? (
                    <div>
                      <dt>Notes</dt>
                      <dd>{submitted.requests}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className={styles.successActions}>
                  <a href={site.phoneHref} className="btn btn--primary">
                    <Phone />
                    Call to reserve
                  </a>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={editRequest}
                  >
                    Edit details
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.formHead}>
                  <h3 ref={formHeadingRef} tabIndex={-1}>
                    Request a table
                  </h3>
                  <p>
                    Share a few details and we&rsquo;ll take it from there.
                  </p>
                </div>

                {hasSubmitted && errorCount > 0 ? (
                  <div className={styles.errorSummary} role="alert">
                    Please check the highlighted fields below.
                  </div>
                ) : null}

                <form ref={formRef} noValidate onSubmit={handleSubmit}>
                  <div className={styles.fields}>
                    <div className={styles.field}>
                      <label htmlFor="name">
                        Full name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={80}
                        required
                        aria-required="true"
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={styles.input}
                      />
                      {errors.name ? (
                        <p id="name-error" className={styles.error}>
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="phone">
                        Phone <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="e.g. 07700 900 812"
                        value={fields.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={32}
                        required
                        aria-required="true"
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={styles.input}
                      />
                      {errors.phone ? (
                        <p id="phone-error" className={styles.error}>
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div className={`${styles.field} ${styles.full}`}>
                      <label htmlFor="email">
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@example.com"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={254}
                        required
                        aria-required="true"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={styles.input}
                      />
                      {errors.email ? (
                        <p id="email-error" className={styles.error}>
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="date">
                        Date <span aria-hidden="true">*</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          value={fields.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          min={minDate || undefined}
                          max={maxDate || undefined}
                          required
                          aria-required="true"
                          aria-invalid={errors.date ? true : undefined}
                          aria-describedby={errors.date ? "date-error" : undefined}
                          className={`${styles.input} ${styles.dateInput}`}
                        />
                      </div>
                      {errors.date ? (
                        <p id="date-error" className={styles.error}>
                          {errors.date}
                        </p>
                      ) : null}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="time">
                        Time <span aria-hidden="true">*</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <select
                          id="time"
                          name="time"
                          value={fields.time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          aria-required="true"
                          aria-invalid={errors.time ? true : undefined}
                          aria-describedby={errors.time ? "time-error" : undefined}
                          className={`${styles.input} ${styles.select}`}
                        >
                          <option value="">Select a time</option>
                          {openingTimes.map((time) => (
                            <option key={time} value={time}>
                              {formatTime(time)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className={styles.selectIcon} aria-hidden="true" />
                      </div>
                      {errors.time ? (
                        <p id="time-error" className={styles.error}>
                          {errors.time}
                        </p>
                      ) : null}
                    </div>

                    <div className={`${styles.field} ${styles.full}`}>
                      <label htmlFor="guests">
                        Number of guests <span aria-hidden="true">*</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <select
                          id="guests"
                          name="guests"
                          value={fields.guests}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          aria-required="true"
                          aria-invalid={errors.guests ? true : undefined}
                          aria-describedby={errors.guests ? "guests-error" : undefined}
                          className={`${styles.input} ${styles.select}`}
                        >
                          {guestOptions.map((count) => (
                            <option key={count} value={count}>
                              {count} {count === "1" ? "guest" : "guests"}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className={styles.selectIcon} aria-hidden="true" />
                      </div>
                      {errors.guests ? (
                        <p id="guests-error" className={styles.error}>
                          {errors.guests}
                        </p>
                      ) : null}
                    </div>

                    <div className={`${styles.field} ${styles.full}`}>
                      <label htmlFor="requests">
                        Special requests{" "}
                        <span className={styles.optional}>Optional</span>
                      </label>
                      <textarea
                        id="requests"
                        name="requests"
                        rows={3}
                        placeholder="Allergies, celebrations, a favourite table…"
                        value={fields.requests}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={400}
                        aria-invalid={errors.requests ? true : undefined}
                        aria-describedby={
                          errors.requests ? "requests-error" : "requests-hint"
                        }
                        className={`${styles.input} ${styles.textarea}`}
                      />
                      <p id="requests-hint" className={styles.hint}>
                        {fields.requests.length} / 400 characters
                      </p>
                      {errors.requests ? (
                        <p id="requests-error" className={styles.error}>
                          {errors.requests}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn--primary btn--wide ${styles.submit}`}
                  >
                    Request a table
                  </button>

                  <p className={styles.demoNote}>
                    <Info aria-hidden="true" />
                    <span>
                      Demonstration form — no reservation data is transmitted or
                      stored, and no table is held.
                    </span>
                  </p>
                </form>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
