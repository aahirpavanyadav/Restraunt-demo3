import { testimonials } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { QuoteMark } from "../ui/Icons";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  return (
    <section
      className={`section ${styles.testimonials}`}
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            align="center"
            eyebrow="Guest book"
            title={
              <>
                Kind words,
                <br />
                <em>kept quietly.</em>
              </>
            }
            description="A few notes left in the guest book — unedited, and shared with permission."
          />
        </Reveal>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.context}
              delay={index * 90}
              className={styles.card}
            >
              <QuoteMark className={styles.quoteMark} />
              <blockquote className={styles.quote}>
                <p>{testimonial.quote}</p>
              </blockquote>
              <p className={styles.attribution}>
                <span aria-hidden="true" />
                {testimonial.context}
              </p>
            </Reveal>
          ))}
        </div>

        <p className={styles.note}>
          Names withheld at our guests&rsquo; request.
        </p>
      </div>
    </section>
  );
}
