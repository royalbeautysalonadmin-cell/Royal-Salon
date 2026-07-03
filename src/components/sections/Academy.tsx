"use client";

import Image from "next/image";
import { GraduationCap, Clock, Award, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { courses } from "@/data/content";

export function Academy() {
  return (
    <section id="academy" className="bg-cream py-24">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Training Academy"
          title="Build a Career in Beauty"
          description="Learn from industry-leading experts with internationally accredited courses, hands-on training and lifelong placement support."
        />

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <RevealItem key={course.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-soft transition-shadow hover:shadow-luxury sm:flex-row">
                <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-44">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Badge variant="dark" className="absolute left-3 top-3">{course.level}</Badge>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl font-semibold text-luxury-black">
                    {course.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-charcoal/65">{course.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-charcoal/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brown" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-brown" /> {course.certification}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-serif text-lg font-semibold text-brown">
                      {formatPrice(course.price)}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={siteConfig.booksyUrl} target="_blank" rel="noopener noreferrer">
                        Enroll Now <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-brown-gradient px-8 py-10 text-center text-white sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <GraduationCap className="h-12 w-12 shrink-0" />
            <div>
              <h3 className="font-serif text-2xl font-semibold">Become a Certified Professional</h3>
              <p className="text-white/80">
                Join 500+ graduates now running successful beauty careers worldwide.
              </p>
            </div>
          </div>
          <Button variant="light" size="lg" asChild>
            <a href="/contact">Request Brochure</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
